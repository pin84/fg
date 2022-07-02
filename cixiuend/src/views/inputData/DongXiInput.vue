<template>
  <div class="people-input">
    <div class="list-box">
      <InputPop :list="list" />
      <InputPopMedia :list="list2" @inputChange="inputChange" />
    </div>

    <div class="btn-box">
      <el-button @click="save" class="btn save" type="primary">保存</el-button>
      <el-button class="btn" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import { msgbox } from "@/utils/utils.js";
import { DongXiData } from "@/config/configData.js";
import { comInputChange, comSave } from "@/views/common.js";
import InputPop from "@/views/components/InputPop.vue";
import InputPopMedia from "@/views/components/InputPopMedia.vue";
export default {
  data() {
    return {
      describe: "",
      list: [],
      list2: [
        {
          mkey: "cover_name",
          mediaUrl: "cover_url",
          title: "封面",
          desc: "请选择jpg/png/jpeg/gif/bmp等图片格式文件",
          accept: ".jpg, .jpeg, .png, .gif,.bmp",
        },
        {
          mkey: "img_name",
          mediaUrl: "img_url",
          title: "图片",
          desc: "请选择jpg/png/jpeg/gif/bmp等图片格式文件",
          accept: ".jpg, .jpeg, .png, .gif,.bmp",
          multiple: "multiple",
        },
        {
          mkey: "vectorfile",
          mediaUrl: "vectorfile_url",
          title: "添加矢量文件",
          desc: "请选择PDF文件",
          accept: ".pdf",
          multiple: "multiple",
        },
        {
          mkey: "video_name",
          mediaUrl: "video_url",
          title: "视频",
          desc: "请选择mp4等格式视频文件",
          accept: ".mp4",
          multiple: "multiple",
        },
      ],
      formDataObj: {},
    };
  },
  components: {
    InputPop,
    InputPopMedia,
  },

  created() {
    let list = JSON.parse(JSON.stringify(DongXiData));
    this.list = list;
  },

  methods: {
    async inputChange(e, item) {
      comInputChange(e, item);
    },

    async uploadfile() {
      let allFormdate = [];
      let record = [];
      this.list2.forEach((obj) => {
        let len = obj.formdateList ? obj.formdateList.length : 0;
        record.push(len);
        if (len) {
          allFormdate.push(...obj.formdateList);
        }
      });

      let promise = allFormdate.map((formData) => {
        return this.$post(this.$api.uploadfile, formData);
      });

      let uploadFileList = await Promise.all(promise).catch((err) => {
        this.$message.error("上传出错，请重试！");
      });

      return { uploadFileList, record };
    },

    localListHandler(resList, recordArr) {
      let i = 0;
      let j = 0;
      let k = 0;
      let copyObj = JSON.parse(JSON.stringify(this.list2));
      for (let num of recordArr) {
        if (!num) {
          i++;
          continue;
        }
        if (i == 0) {
          j = 0;
          k = num;
        } else {
          j = k;
          k = k + num;
        }
        let arr = resList.slice(j, k);

        let originalnameArr = [];
        let filenameArr = [];
        arr.forEach((obj) => {
          let { filename, originalname } = obj.data;
          originalnameArr.push(originalname);
          filenameArr.push(filename);
        });

        copyObj[i]["originalnameArr"] = originalnameArr.join(",");
        copyObj[i]["filenameArr"] = filenameArr.join(",");
        i++;
      }

      return copyObj;
    },

    async save() {
      let nameObj = this.list.find((item) => item.mkey == "name");
      if (!nameObj.inputText) {
        msgbox({
          msg: "请输入作品名称",
        });
        return;
      }
      let obj = {};
      this.list.forEach((item) => {
        obj[item.mkey] = item.inputText;
      });

      // let { name } = obj;
      // let result = await this.$get(this.$api.getplay, { name });

      // if (result.data.total) {
      //   msgbox({ msg: "名字已存在，请不要重复添加" });
      //   return;
      // }

      let { uploadFileList, record } = await this.uploadfile();
      for (let obj of uploadFileList) {
        if (obj.code == -1) {
          msgbox({ msg: "上传文件出错，上传的视频或音频不能大于50M" });
          return;
        }
      }

      let copyObj = this.localListHandler(uploadFileList, record);

      let mediaObj = {};
      copyObj.forEach((item) => {
        if (item.filenameArr) {
          mediaObj[item.mkey] = item.originalnameArr;
          mediaObj[item.mediaUrl] = item.filenameArr;
        }
      });

      obj = Object.assign({}, obj, mediaObj);
      obj.d_type = obj.d_type.join(",");
      console.log("===obj===", obj);
      let url = this.$api.addplay;

      let res = await this.$post(url, obj);
      msgbox({
        msg: res.data,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.people-input {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 30px 10px;
  box-sizing: border-box;

  .list-box {
    width: 800px;
  }

  .textarea-box {
    width: 100%;
    text-align: left;

    .item-textarea {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .title {
        flex: 0 0 100px;
      }

      .textarea {
        width: 100%;
        height: 60px;
        padding: 10px;
        outline: none;
        border: 1px solid #f1f1f1;
        resize: none;
        border-radius: 3px;
        box-sizing: border-box;
      }
    }
  }

  .btn-box {
    width: 70%;
    margin-top: 20px;

    .btn {
      width: 20%;
    }

    .save {
      margin-right: 20px;
    }
  }
}
</style>