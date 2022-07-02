<template>
  <div id="overview-page">
    <header class="header">
      <Header />
    </header>
    <div class="main-body">
      <div class="aside">
        <Aside @selectPage="selectPage" @toAcount="toAcount" />
      </div>
      <div class="body">
        <!-- <div class="bread-box">
          <Breadcrumb />
        </div> -->
        <div class="page-box">
          <Acount v-if="curPage == 'acount'" />
          <PeopleInput v-if="curPage == '/0/0'" />
          <DongXiInput v-if="curPage == '/0/1'" />
          <Works v-if="curPage == '/0/2'" />
          <PeopleManage v-if="curPage == '/1/0'" />
          <DongXiManage v-if="curPage == '/1/1'" />
          <WorkManage v-if="curPage == '/1/2'" />

          <PeopleCountMonth v-if="curPage == '/2/0'" />
          <PeopleCountWithType v-if="curPage == '/2/1'" />
          <PlayCountMonth v-if="curPage == '/2/2'" />
          <PlayCountWithType v-if="curPage == '/2/3'" />
          <WorkCountMonth v-if="curPage == '/2/4'" />
          <WorkCountWithType v-if="curPage == '/2/5'" />
          <TypeManage v-if="curPage == '/3/0'" />
          <!-- <UserManage v-if="curPage == '/3/1'" /> -->
          <Role v-if="curPage == '/3/1'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DongXiData, inputList } from "@/config/configData.js";
import Header from "@/views/header";
import Aside from "@/views/aside/index.vue";
import Acount from "@/views/acount/Acount.vue";
import Breadcrumb from "@/views/breadcrumb/index.vue";
import PeopleInput from "@/views/inputData/PeopleInput.vue";
import DongXiManage from "@/views/manage/DongXiManage.vue";
import PeopleManage from "@/views/manage/PeopleManage.vue";
export default {
  data() {
    return {
      curPage: "acount",
    };
  },
  components: {
    Header,
    Aside,
    Acount,
    Breadcrumb,
    PeopleInput,
    PeopleManage,
    DongXiInput: () => import("@/views/inputData/DongXiInput.vue"),
    DongXiManage,
    WorkManage: () => import("@/views/manage/WorkManage.vue"),
    Works: () => import("@/views/inputData/Works.vue"),
    TypeManage: () => import("@/views/system/TypeManage.vue"),
    // UserManage: () => import("@/views/system/UserManage.vue"),
    PeopleCountMonth: () => import("@/views/count/PeopleCountMonth.vue"),
    PeopleCountWithType: () => import("@/views/count/PeopleCountWithType.vue"),
    PlayCountMonth: () => import("@/views/count/PlayCountMonth.vue"),
    PlayCountWithType: () => import("@/views/count/PlayCountWithType.vue"),
    WorkCountMonth: () => import("@/views/count/WorkCountMonth.vue"),
    WorkCountWithType: () => import("@/views/count/WorkCountWithType.vue"),
    Role: () => import("@/views/system/Role.vue"),
  },

  created() {
    this.updateType();
  },

  watch: {
    "$store.state.v1.updateType": function () {
      this.updateType();
    },
  },

  methods: {
    async updateType() {
      let obj = {
        datatype: 1,
        size: 10,
      };
      let res = await this.$get(this.$api.getconfig, obj);
      let { total, config: list } = res.data;
      let pepleType = list
        .filter((item) => item.d_type == "传统艺人分类")
        .map((item) => item.name);
      let playType = list
        .filter((item) => item.d_type == "作品分类")
        .map((item) => item.name);

      let dropdownList_p = pepleType.length
        ? pepleType
        : ["传承人", "民间艺人"];
      inputList[0].dropdownList = dropdownList_p;
      inputList[0].inputText = dropdownList_p[0];

      let dropdownList = playType.length
        ? playType
        : ["动物纹", "植物纹", "景物纹"];
      DongXiData[0].dropdownList = dropdownList;
      // DongXiData[0].inputText = dropdownList
    },
    selectPage(pi) {
      this.curPage = pi;
    },
    toAcount() {
      this.curPage = "acount";
    },
  },
};
</script>


<style lang="scss" scoped>
#overview-page {
  width: 100vw;
  height: 100vh;
  // border: 1px solid blue;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 70px;
  }

  .main-body {
    height: 100%;
    // border: 1px solid red;
    display: flex;
    overflow: hidden;

    .aside {
      flex: 0 0 200px;
    }

    .body {
      width: 100%;
      height: 100%;
      // border: 2px solid green;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .bread-box {
        flex: 0 0 65px;
      }

      .page-box {
        height: 100%;
        overflow: scroll;
      }
    }
  }
}

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
}

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
  #overview-page {
    .main-body {
      .aside {
        display: none;
      }
    }
  }
}

// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
}
</style>