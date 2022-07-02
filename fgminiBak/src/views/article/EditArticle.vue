<template>
  <div id="edit-article">
    <div class="item">
      <span class="right-title">类型：</span>
      <select @change="changeType(curType)" class="select" v-model="curType">
        <option v-for="(item, index) in typeList" :key="index">
          {{ item.type }}
        </option>
      </select>
    </div>

    <div class="item" v-if="curTypeNo == 4">
      <span class="right-title">案例类型：</span>
      <select @change="changeType_1('1')" class="select" v-model="curCaseType">
        <option v-for="(itemb, idxa) in casesList" :key="idxa">
          {{ itemb.name }}
        </option>
      </select>
    </div>

    <div class="item" v-if="curTypeNo == 8">
      <span class="right-title">建材类型：</span>
      <select
        @change="changeType_1('2')"
        class="select"
        v-model="curJianChaiType"
      >
        <option v-for="(itemb, idxa) in jianchaiList" :key="idxa">
          {{ itemb.name }}
        </option>
      </select>
    </div>

    <div class="item">
      <div class="title-box" v-if="curTypeNo != 5">
        <span class="text">标题</span>
        <el-input class="title-input" v-model="form.title"></el-input>
      </div>
    </div>

    <div v-if="isShowSubtitle" class="item">
      <span class="text">副标题</span>
      <textarea
        rows="2"
        cols="20"
        class="subtitle-input"
        v-model="form.subtitle"
      ></textarea>
    </div>

    <div class="item" >
      <span class="text">{{ curTypeNo == 5 ? "头像" : "封面图片" }}</span>
      <input
        accept="image/*"
        @change="selectFile"
        id="edit-file-upload"
        type="file"
      />

      <div v-if="imgURL" class="img-box">
        <el-image style="width: 100%" :src="imgURL" fit="contain"></el-image>
      </div>
    </div>

    <div class="item" v-if="false">
      <span class="text">时间</span>
      <el-date-picker
        popper-class="picker"
        type="date"
        placeholder="选择日期"
        v-model="form.date1"
        style="width: 200px"
      ></el-date-picker>
    </div>
    <Editor v-if="isLoad" :form="form" />

    <div class="btn-box">
      <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { waitImgOnload, imgToBlob, msgbox } from "@/utils/utils.js";
import Editor from "@/views/components/Editor.vue";
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isLoad: false,
      curType: "国家政策",
      curTypeNo: 1,
      typeList: [
        { type: "国家政策", typeNo: 1 },
        { type: "特色文化传承", typeNo: 2 },
        { type: "乡村振兴案例", typeNo: 3 },
        { type: "案例分享", typeNo: 4 },
        { type: "驻村书记说简介", typeNo: 5 },
        { type: "驻村书记说新闻", typeNo: 6 },
        { type: "培训信息", typeNo: 7 },
        { type: "建材库", typeNo: 8 },
      ],
      jianchaiList: [
        {
          name: "传统建材",
          jianchaiType: 1,
        },
        {
          name: "现代建材",
          jianchaiType: 2,
        },
      ],
      curJianChaiType: "传统建材",
      curJianChaiTypeNo: 1,
      casesList: [
        {
          name: "乡村规划",
          caseType: 1,
        },
        {
          name: "人居",
          caseType: 2,
        },
        {
          name: "家装",
          caseType: 3,
        },
      ],
      curCaseType: "乡村规划",
      curCaseNo: 1,

      btnText: "立即创建",
      imgURL: "",
      blob: null,
      imgsrc: "",
      form: {
        content: "",
        title: "",
        subtitle: "",
        date1: "",
      },
      isShowSubtitle: true,
    };
  },
  components: {
    Editor,
    // ArticleUploadImg,
  },

  mounted() {
    this.initData();
  },
  methods: {
    changeType_1(num) {
      let list = [];
      let type = "";
      if (num == 1) {
        list = this.casesList;
        type = this.curCaseType;
      } else {
        list = this.jianchaiList;
        type = this.curJianChaiType;
      }

      let idx = list.findIndex((item) => item.name == type);

      if (num == 1) {
        this.curCaseNo = idx + 1;
      } else {
        this.curJianChaiTypeNo = idx + 1;
      }
    },
    changeJianChaiType() {
      // let idx = this.jianchaiList.findIndex(
      //   (item) => item.name == this.curJianChaiType
      // );
      // this.curJianChaiTypeNo = idx + 1;
    },
    changeType(curType) {
      let curTypeNo = this.typeList.find((item) => item.type == curType).typeNo;

      this.curTypeNo = curTypeNo;
      console.log(curTypeNo);
      switch (curTypeNo) {
        case 4:
          this.isShowSubtitle = false;
          break;
        case 5:
          this.isShowSubtitle = false;
          break;
        case 8:
          this.isShowSubtitle = false;
          break;

        default:
          break;
      }
    },

    initData() {
      this.isLoad = false;
      if (JSON.stringify(this.article) == "{}") {
        this.isLoad = true;
        return;
      }
      let {
        title,
        subtitle,
        time,
        content,
        coverURL,
        type: articleType,
        jctype,
        casetype
      } = this.article;
      this.form.title = title;
      this.form.subtitle = subtitle;
      this.form.date1 = time;
      this.form.content = content;
      this.btnText = "修改";
      this.curTypeNo = articleType;
      this.curType = this.typeList.find(
        (item) => item.typeNo == articleType
      ).type;

      if (jctype) {
        this.curJianChaiTypeNo = jctype;
        this.curJianChaiType = this.jianchaiList.find(
          (item) => item.jianchaiType == jctype
        ).name;
      }

      if (casetype) {
        this.curCaseNo = casetype;
        this.curCaseType = this.casesList.find(
          (item) => item.caseType == casetype
        ).name;
      }

      this.changeType(this.curType);
      this.isLoad = true;
    },

    async selectFile(e) {
      let file = document.getElementById("edit-file-upload").files[0];
      // 通过 file 生成目标 url
      var imgURL = URL.createObjectURL(file);
      this.imgURL = imgURL;
      let img = await waitImgOnload(imgURL);
      let blob = await imgToBlob(img);
      this.blob = blob;

      console.log(blob);
    },
    async onSubmit() {
      let d = {
        type: this.curTypeNo,
        jctype: this.curTypeNo == 8 ? this.curJianChaiTypeNo : "", //建材的类型，1为传统建材 2为现代建材
        casetype: this.curTypeNo == 4 ?  this.curCaseNo : '' //案例分享的类型，1为乡村规划，2为人居 3为家装
      };

      d = Object.assign({}, this.form, d);

      if (this.blob) {
        let formData = new FormData();
        formData.append("fileName", this.blob);
        let { code: code1, data: url } = await this.$post(
          this.$api.uploadimg,
          formData
        );
        if (code1 == -1) {
          msgbox({ msg: url });
          return;
        }

        d["coverURL"] = url;
      }

      let d1 = new Date(this.form.date1).getTime();
      d.time = d1 ? String(d1) : "";
      delete d["date1"];
      let { id } = this.article;
      if (id) {
        d["id"] = id;
      }

      if (this.curTypeNo == 4) {
        let token = localStorage.getItem("token");
        d["token"] = token;
      }

      console.log("--d---", d);

      let { code, data } = await this.$post("/fg/uplod/article", d);

      console.log(data);
      await msgbox({ msg: data });
      this.resetData();
    },

    resetData() {
      this.blob = null;
    },

    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.picker {
  z-index: 20000 !important;
}
</style>

<style lang="scss" scoped>
#edit-article {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .title-box {
      margin-right: 20px;
      .text {
        margin-right: 20px;
        display: inline-block;
        flex: 0 0 80px;
      }
    }
    .right-title {
      flex: 0 0 80px;
    }
    .select {
      width: 200px;
      height: 38px;
    }
  }
  .title-input {
    width: 400px;
  }

  .subtitle-input {
    resize: none;
    width: 600px;
    padding: 10px;
    font-size: 14px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .img-box {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
    }
  }

  #editor {
    z-index: 0;
  }
  .btn-box {
    margin-top: 30px;
  }
}
</style>