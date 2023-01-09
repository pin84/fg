<template>
  <div id="article">
    <div class="search-box">
      <div>
        <label for="upload" class="label">上传</label>
        <input
          @change="uploadImg"
          type="file"
          id="upload"
          style="display: none"
        />
      </div>
      <div class="select-box">
        <span>类型：</span>
        <select @change="changeType(curType)" class="select" v-model="curType">
          <option v-for="(item, index) of typeList" :key="index">
            {{ item.type }}
          </option>
        </select>
      </div>
    </div>

    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="time com ellipsis">{{ item.create_time }}</div>
        <div class="title com ellipsis">
          <el-image
            style="width: 100px; height: 40px"
            :src="item.imgURL"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
        <!-- <div class="con com ellipsis">
          {{ item.imgURL }}
        </div> -->
        <div class="con com ellipsis">
          {{ item.typecn }}
        </div>
        <div class="btn-box">
          <el-button @click="deleteArticle(item)" type="text" size="small"
            >删除</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { waitImgOnload, imgToBlob, msgbox } from "@/utils/utils.js";
export default {
  data() {
    return {
      blob: null,
      listData: [],
      srcList: [],
      typeList: [
        {
          type: "首页",
          typeNo: 1,
        },
        {
          type: "驻村书记说",
          typeNo: 2,
        },
      ],
      curType: "首页",
    };
  },

  created() {
    this.initData();
  },

  methods: {
    changeType(curType) {
      this.curType = curType;
    },
    async uploadImg() {
      let file = document.getElementById("upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;

      //  let imgURL = await upload.fileToBase64(file);
      let img = await waitImgOnload(imgURL);
      let blob = await imgToBlob(img);
      this.blob = blob;

      let formData = new FormData();

      formData.append("fileName", blob);

      let { code, data } = await this.$post("/mini/upload", formData);
      let typeNo = this.typeList.find(
        (item) => item.type == this.curType
      ).typeNo;

      let res = await this.$post("/fg/createbanner", {
        imgURL: data,
        type: typeNo,
      });

      await msgbox({
        msg: res.data,
      });

      this.initData();
    },
    async deleteArticle(item) {
      let res = await this.$get(`/fg/delbanner?id=${item.id}`);
      this.initData();
    },
    async initData() {
      let res = await this.$get("/fg/getbannerlist");

      debugger
      let list = res.data;
      list.forEach((item) => {
        this.srcList.push(item.imgURL);
        item.create_time = item.create_time.split("T")[0];
        item.typecn = item.type == 1 ? '首页' : '驻村书记说'
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
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    .label {
      display: inline-block;
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
    .select-box {
      display: flex;
      align-items: center;
      margin-left: 60px;
      .select {
        width: 150px;
        height: 100%;
        outline: none;
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