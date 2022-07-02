<template>
  <div class="list">
    <div class="item" v-for="(item, index) in listData" :key="index">
      <div class="time com ellipsis">{{ item.time }}</div>
      <div class="title com ellipsis">{{ item.title }}</div>
      <!-- <div class="con com ellipsis">{{ item.subtitle }}</div> -->
      <div class="btn-box">
        <el-button @click="edit(item)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteArticle(item)" type="text" size="small"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { msgbox } from "@/utils/utils.js";
export default {
  props: {
    articleType: {
      type: String,
      default: () => "1",
    },
  },
  data() {
    return {
      curArticle: {},
      isShowArticle: true,
      inputText: "",
      listData: [],
    };
  },

  watch: {
    articleType: function (val) {
      this.initData(val);
    },
  },

  components: {
    // EditArticle,
  },

  created() {
    this.initData(this.articleType);
  },

  methods: {
    async deleteArticle(item) {
      let res = await this.$get(`/fg/delArticle?id=${item.id}`);
      await msgbox({
        msg: res.data,
      });
      this.initData(this.articleType);
    },
    async initData(type) {
      let res = await this.$get(
        `/fg/getArticle?page=1&num=999&type=${Number(type)}`
      );
      let list = res.data;
      list.forEach((item) => {
        item.time = item.create_time.split("T")[0];
      });
      this.listData = list;
    },

    cancel() {
      this.isShowArticle = true;
      this.initData();
    },
    uploadArticle() {
      this.$emit("toUploadArticle");
    },
    edit(obj) {
      this.$emit("editArticle", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin: 30px;
  width: 100%;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .item {
    display: flex;
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
      width: 100%;
    }

    .con {
      flex: 0 0 300px;
      text-align: left;
    }

    .btn-box {
      flex: 0 0 150px;
      display: flex;
      align-items: center;
    }
  }
}
</style>