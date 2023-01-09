<template>
  <div id="article">
    <div class="search-box">
      <label for="upload" class="label">获取图片地址</label>
      <input
        @change="uploadImg"
        type="file"
        id="upload"
        style="display: none"
      />
    </div>
    <div class="list">
      <div class="item" v-for="(url, index) of srcList" :key="index">
        <div class="title com ellipsis">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
        <div class="con com ellipsis">
          {{ url }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from "/src/utils/utils.js";
import { get, post } from "/src/plugins/axios.js";
import { ElMessage, ElMessageBox } from "element-plus";
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

  components: {},

  created() {
    // this.initData();
  },

  methods: {
    async uploadImg() {
      let file = document.getElementById("upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;

      //  let imgURL = await upload.fileToBase64(file);
      let img = await upload.waitImgOnload(imgURL);
      let blob = await upload.imgToBlob(img);
      this.blob = blob;

      let formData = new FormData();

      formData.append("fileName", blob);

      let res = await post("/mini/upload", formData);
      this.srcList.push(res.data);
      console.log(res);
      // ElMessage.success("上传成功");
      // this.initData();
    },
    async deleteArticle(item) {
      let res = await get(`/fg/delbanner?id=${item.id}`);
      this.initData();
      ElMessage.success(res.data);
    },
    async initData() {
      let res = await get("/fg/getbannerlist");
      let list = res.data;
      list.forEach((item) => {
        this.srcList.push(item.imgURL);
        item.create_time = item.create_time.split("T")[0];
      });
      console.log(list);
      this.listData = [list[0]];
    },
    cancel() {
      this.isShowArticle = true;
      this.initData();
    },
    uploadArticle() {
      this.isShowArticle = false;
    },
    edit(obj) {
      this.curArticle = obj;
      this.isShowArticle = false;
    },

    formatDate(time) {
      var date = new Date(parseInt(time));
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      return year + "/" + mon + "/" + day;
    },
  },
};
</script>

<style lang="scss" scoped>
#article {
  position: relative;
  background-color: #fff;
  z-index: 30000;
  .search-box {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    .label {
      height: 100%;
      padding: 5px;
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
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      border-bottom: 1px solid #000;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      margin-bottom: 5px;
      &:hover {
        background-color: #eee;
      }
     
    
    }
  }
}
</style>