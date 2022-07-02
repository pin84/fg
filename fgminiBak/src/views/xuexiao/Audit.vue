<template>
  <div id="article">
    <h3 style="padding:10px 0">申请成为设计师</h3>
    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="time com ellipsis">{{ item.create_time }}</div>
        <div class="title com ellipsis">
          {{ item.username }}
        </div>
        <div class="con com ellipsis">
          {{ item.phone }}
        </div>
        <div class="con com ellipsis">
          {{ item.phone }}
        </div>

        <div class="btn-box">
          <el-button @click="agree(item)" type="text" size="small"
            >同意</el-button
          >
          <el-button @click="disagree(item)" type="text" size="small"
            >不同意</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import upload from "/src/utils/utils.js";
// import EditArticle from "./EditArticle.vue";
// import { get, post } from "/src/plugins/axios.js";
// import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      blob: null,
      curArticle: {},
      isShowArticle: true,
      inputText: "",
      listData: [],
      srcList: [],
    };
  },

  components: {
    // EditArticle,
  },

  created() {
    this.initData();
  },

  methods: {
    async agree(item) {
      let res = await this.$get(`/fg/admin/designer?id=${item.id}`);
      let { code } = res;
      if (code == -1) {
        // ElMessage.error("请求失败");
        return;
      }
      // ElMessage.success("上传成功");
      this.initData();
    },
    async disagree(item) {
      let res = await this.$get(`/fg/admin/disagree?id=${item.id}`);
      this.initData();
      // ElMessage.success(res.data);
    },
    async initData() {
      let res = await this.$get("/fg/getapplydesi");
      let list = res.data;
      list.forEach((item) => {
        item.create_time = item.create_time.split("T")[0];
      });
      this.listData = list;
    },


  
  },
};
</script>

<style lang="scss" scoped>
#article {
  position: relative;
  background-color: #fff;
  padding: 30px;
  .search-box {
    width: 50%;
    margin-bottom: 20px;
    .label {
      padding: 10px 25px;
      background-color: #409eff;
      color: #fff;
      font-size: 14px;
      border-radius: 3px;
      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }
    }
    .input {
      width: 200px;
    }
    .btn {
      margin-left: 10px;
    }
  }
  .edit-box {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1200px;
    height: 600px;
    z-index: 10;
    border: 1px solid red;
  }
  .list {
    width: 100%;
    border: 1px solid #ccc;
    border-bottom: none;
    .item {
      display: flex;
      // align-items: center;
      border-bottom: 1px solid #ccc;
      &:hover {
        background-color: #eee;
      }
      .com {
        border-right: 1px solid #ccc;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
      .time {
        flex: 0 0 130px;
      }
      .title {
        flex: 0 0 100px;
      }
      .con {
        width: 100%;
        text-align: left;
      }

      .btn-box {
        flex: 0 0 150px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>