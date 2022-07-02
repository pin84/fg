<template>
  <div id="my-pop">
    <div class="content">
      <div class="top">
        {{ title }}
        <i @click="close" class="iconfont icon-guanbi pointer"></i>
      </div>
      <ul class="list" v-if="popType == 1 || popType == 2">
        <li class="item" v-for="(item, index) in list" :key="index">
          <span class="item-top">{{ item.title }}</span>
          <el-image style="width: 100%; height: 100%" :src="item.imgURL" fit="contain"></el-image>
          <el-button @click="deleleMedia(item, index)" size="mini" class="btn" type="success">删除{{ mtype }}</el-button>
        </li>
      </ul>
      <ul class="list" v-if="popType == 3">
        <li class="item audio-item" v-for="(item, index) in list" :key="index">
          <span class="item-top">{{ item.title }}</span>
          <audio controls class="audio">
            <source :src="item.imgURL" />
            Sorry, your browser doesn't support embedded audio.
          </audio>
          <el-button @click="deleleMedia(item, index)" size="mini" class="btn" type="success">删除{{ mtype }}</el-button>
        </li>
      </ul>
      <ul class="list" v-if="popType == 4">
        <li class="item vedio-item" v-for="(item, index) in list" :key="index">
          <span class="item-top">{{ item.title }}</span>
          <video controls width="100%" height="170px">
            <source :src="item.imgURL" type="video/webm" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <el-button @click="deleleMedia(item, index)" size="mini" class="btn" type="success">删除{{ mtype }}</el-button>
        </li>
      </ul>
      <!-- PDF -->
      <ul class="list" v-if="popType == 9">
        <li class="item" v-for="(item, index) in list" :key="index">
          <span class="item-top">{{ item.title }}</span>
          <a :href="item.imgURL" target="_blank">
            <img src="@/assets/images/icon-pdf.png" class="img" alt="" />
          </a>
          <el-button size="mini" class="btn"  @click="deleleMedia(item, index)" type="success">删除{{ mtype }}</el-button>
        </li>
      </ul>
      <div class="lista" v-if="popType == 10">
        <InputPop :list="list" />
      </div>
      <div class="foot" v-if="popType == 10">
        <el-button @click="save" size="small" class="btn" type="primary">保存</el-button>
        <el-button @click="close" size="small" class="btn" type="info">取消</el-button>
      </div>
      <div class="foot" v-else>
        <el-button v-if="isCoverHas" @click="hasCover" size="small" class="btn mr_10" type="success">上传</el-button>
        <label v-else for="file-upload" class="label pointer">上传</label>
        <input @change="uploadFile" type="file" id="file-upload" style="display: none" :accept="accept"
          ref="inputFile" />

        <el-button @click="close" size="small" class="btn" type="primary">确定</el-button>
        <el-button @click="close" size="small" class="btn" type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fileToBase64, base64ToBlob, fileAppenToFormData } from "@/utils/utils";
import InputPop from "@/views/components/InputPop.vue";
export default {
  props: {
    title: {
      type: String,
      default: () => "媒体列表",
    },
    mtype: {
      type: String,
      default: () => "图片",
    },
    popType: {
      type: Number,
      default: () => 1,
    },
    list: {
      type: Array,
      default: () => [],
    },
    accept: {
      type: String,
      default: () => ".jpg, .jpeg, .png, .gif,.bmp"
    }
  },
  data() {
    return {
      isCoverHas: false,
    };
  },
  watch: {
    'list': {
      handler: function (val) {
        this.handlerData();
      },
      deep: true
    }
  },

  components: {
    InputPop,
  },

  created() {
    this.handlerData();
  },

  methods: {
    //编辑
    save() {
      this.$emit("editInfo");
    },
    handlerData() {
      // console.log(this.list);
      if (this.popType == 1 && this.list.length) {
        this.isCoverHas = true;
      } else {
        this.isCoverHas = false;
      }
    },
    //delete
    deleleMedia(item, index) {
      console.log(item);
      this.$emit("deleleMedia", item);
    },


    //上传文件
    async uploadFile(e) {
      let file = e.target.files[0];
      let type = file.type.split('/')[0]
      let formData
      if (type == 'image') {
        let { name } = file
        let base64URL = await fileToBase64(file)
        let blob = await base64ToBlob(base64URL)
        formData = fileAppenToFormData(blob, name);
      } else {
        formData = fileAppenToFormData(file);
      }
      this.$emit("changeMedia", formData);
      this.$refs.inputFile.value = ''
    },


    beforCheck() {
      if (this.popType == 1) {
        this.$message.error("错了哦，这是一条错误消息");
        return;
      }
    },
    close() {
      this.$store.commit("isShowPopWrapper", 0);
    },
    hasCover() {
      this.$alert("封面图片只能有一张，请先删除现有的图片再上传", "提示");
    },
  },
};
</script>
<style lang="scss" scoped>
#my-pop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .content {
    width: 750px;
    height: 438px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 15px;
    box-sizing: border-box;
    overflow: hidden;

    .top {
      position: relative;
      background-color: #f5fafe;
      font-size: 14px;
      padding: 15px;

      .iconfont {
        position: absolute;
        right: 0;
        padding: 0 10px;
        box-sizing: border-box;

        &:hover {
          color: red;
        }
      }
    }

    .list {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      overflow-y: scroll;

      .item {
        margin-bottom: 10px;
        margin-top: 10px;
        width: 45%;
        height: 180px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        // text-align: center;
        box-shadow: 0 4px 8px 0 #ccc;
        overflow: hidden;

        .item-top {
          width: 100%;
          flex: 0 0 25px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          // padding: 0 10px;
          box-sizing: border-box;
        }

        .img {
          width: 100px;
          height: 100px;
        }

        .btn {
          width: 100%;
          flex: 0 0 20px;
          line-height: 20px;
        }
      }

      .vedio-item {
        height: 230px;
      }

      .audio-item {
        width: 55%;
        height: 150px;

        .audio {
          width: 100%;
        }
      }
    }

    .lista {
      height: 100%;
      padding-right: 30px;
      overflow-y: scroll;
    }

    .label {
      display: inline-block;
      background-color: #67c23a;
      color: #fff;
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 2px;
      margin: 0 5px;

      &:hover {
        opacity: 0.9;
      }
    }

    .mr_10 {
      margin-right: 10px;
    }

    .foot {
      padding-top: 5px;
    }
  }
}
</style>