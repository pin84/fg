<template>
  <div id="overview-page">
    <header class="header">
      <Header />
    </header>
    <div class="main-body">
      <div class="aside">
        <Aside @selectPage="selectPage" />
      </div>
      <div class="body">
        <!-- <div class="bread-box">
          <Breadcrumb />
        </div> -->
        <div class="page-box">
          <BannerList v-if="curPage == '/0/0'" />
          <Audit v-if="curPage == '/1/0'" />
          <EditArticle
            v-if="curPage == '/2/0'"
            :article="curArticle"
            @cancel="toArticleList"
          />

          <A1GuoJiaZhengChe
            v-if="curPage == '/2/1'"
            :articleType="articleType"
            @editArticle="editArticle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { DongXiData, inputList } from "@/config/configData.js";
import Header from "@/views/header";
import Aside from "@/views/aside/index.vue";
// import Acount from "@/views/acount/Acount.vue";
// import Breadcrumb from "@/views/breadcrumb/index.vue";
// import PeopleInput from "@/views/inputData/PeopleInput.vue";
export default {
  data() {
    return {
      // curPage: "acount",
      curPage: "/0/0",
      curArticle: {},
      articleType: 1,
    };
  },
  components: {
    Header,
    Aside,
    Audit: () => import("@/views/xuexiao/Audit.vue"),
    A1GuoJiaZhengChe: () => import("@/views/article/A1GuoJiaZhengChe.vue"),
    EditArticle: () => import("@/views/article/EditArticle.vue"),
    BannerList: () => import("@/views/xuexiao/BannerList.vue"),
  },

  created() {},

  watch: {},

  methods: {
    toArticleList() {
      this.curPage = "/2/1";
    },
    editArticle(obj) {
      console.log(obj);
      this.curArticle = obj;
      this.curPage = "/2/0";
    },

    selectPage(pi) {
      // if (pi == this.curPage) return;
      this.curArticle = {};
      let arr = pi.split("/");
      if (arr[1] == 2 && arr[2] != 0) {
        this.articleType = arr[2];
        pi = "/2/1";
      }
      this.curPage = pi;
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