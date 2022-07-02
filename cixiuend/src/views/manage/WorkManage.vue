<template>
  <div id="people-manage">
    <div class="search-box">
      <li class="item">
        <span class="title">工作名称</span>
        <input class="input" v-model="name" placeholder="请输入内容" />
      </li>
      <li class="item">
        <span class="title">工作分类</span>
        <select @change="curIndex = 1" class="input" v-model="successor_level">
          <option
            :value="item.name"
            v-for="(item, index) in workType"
            :key="index"
          >
            {{ item.name }}
          </option>
        </select>
      </li>
      <el-button @click="search" class="btn" type="primary">查询</el-button>
      <!-- <el-button class="btn" type="info" @click="dialogVisible = true">高级检索</el-button> -->
      <DownloadExcel
        v-if="tableData.length"
        :dataList="tableData"
        dataType="3"
      />
      <!-- <el-button class="btn" type="info">导出</el-button> -->
    </div>

    <div v-if="tableData.length" class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-for="(item, index) in tableLineList"
          :key="index"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="270">
          <template slot-scope="scope" v-if="isShowOprator">
            <el-button
              v-show="item.isShow"
              class="op-btn"
              :type="item.type || 'success'"
              size="mini"
              @click="showPop(scope.row, index)"
              v-for="(item, index) in btnList"
              :key="index"
              >{{ item.name }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else style="padding: 30px">暂无数据</div>
    <div class="footer">
      <Pagination @currentChange="currentChange" />
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      top="35vh"
      :before-close="handleClose"
      class="dialog"
    >
      <ul class="list advanced-search-box">
        <li class="item" v-for="(item, idx) in advancedSearch" :key="idx">
          <span class="title" style="margin-right: 20px">{{ item.title }}</span>
          <input v-model="item.inputText" type="text" class="input" />
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button @click="search">查 询</el-button>
        <el-button type="primary" @click="clearInput">清空检索</el-button>
      </span>
    </el-dialog>

    <ShowMediaPop
      v-if="$store.state.v1.isShowPopWrapper"
      :list="infoList"
      :popType="popType"
      :title="title"
      :accept="accept"
      :mtype="mtype"
      @editInfo="editInfo"
      @changeMedia="uploadMedia"
      @deleleMedia="deleleMedia"
    />
  </div>
</template>

<script>
import { workType, works } from "@/config/configData.js";
import { showImgURL } from "@/config/config.js";
import ShowMediaPop from "@/views/components/ShowMediaPop.vue";
import { msgbox, toLocalDate } from "@/utils/utils.js";
import Pagination from "@/views/components/Pagination.vue";
import DownloadExcel from "@/views/components/DownloadExcel.vue";
export default {
  data() {
    return {
      mtype: "图片",
      title: "媒体列表",
      curIndex: 1,
      pageSize: 5,
      dialogVisible: false,
      name: "",
      addr: "",
      successor_level: "全部",
      workType: [],
      advancedSearch: [
        {
          title: "手机号",
          mkey: "phone",
        },
        {
          title: "出生日期",
          mkey: "birthday",
        },
        {
          title: "荣获年份",
          mkey: "honor_year",
        },
        {
          title: "荣誉称号",
          mkey: "honor_names",
        },
      ],
      tableData: [],
      tableLineList: [
        {
          prop: "num",
          label: "序列",
          width: "50",
        },
        {
          prop: "name",
          label: "工作名称",
          width: "150",
        },
        {
          prop: "d_type",
          label: "工作分类",
          width: "150",
        },
        {
          prop: "content",
          label: "工作内容",
          width: "350",
        },
        {
          prop: "create_time",
          label: "添加时间",
          width: "150",
        },
      ],
      btnList: [
        {
          name: "封面",
          type: "success",
          isShow: true,
        },
        {
          name: "图片",
          isShow: true,
        },
        {
          name: "音频",
          isShow: true,
        },
        {
          name: "视频",
          isShow: true,
        },
        {
          name: "编辑",
          type: "primary",
          isShow: true,
        },
        {
          name: "删除",
          type: "danger",
          isShow: localStorage.getItem("jurisdiction").split(",").includes("4"),
        },
      ],
      infoList: [], //info
      popType: 1, //传给pop用
      curPopIndex: 1, //本页面用
      curSelectObj: {},
      accept: ".jpg, .jpeg, .png, .gif,.bmp",
      isShowOprator: true,
    };
  },
  components: {
    ShowMediaPop,
    Pagination,
    DownloadExcel,
  },
  created() {
    this.initData();
    this.search();
  },
  methods: {
    initData() {
      this.workType = workType;
      this.pageSize = this.$store.state.v1.pageSize;
      this.isShowOprator = localStorage
        .getItem("jurisdiction")
        .split(",")
        .includes("3");
    },
    async editInfo() {
      let obj = {};
      this.infoList.forEach((item) => {
        obj[item.mkey] = item.inputText;
      });
      let { id } = this.curSelectObj;
      obj = Object.assign({}, obj, { id });
      this.updateUser(obj);
    },

    async updateUser(params) {
      let url = this.$api.updatework;
      console.log("===obj===", params);
      let { code, data } = await this.$post(url, params);

      await msgbox({
        msg: data,
      });
      if (code == -1) return;

      if (this.popType == 10) {
        this.$store.commit("isShowPopWrapper", 0);
      }
      this.search();
    },

    handlerPopType(res, type = "update") {
      let obj = {};
      switch (this.popType) {
        case 1:
          let { filename, originalname } = res;
          obj = {
            cover_url: type == "update" ? filename : "",
            cover_name: type == "update" ? originalname : "",
          };
          break;
        case 2:
          let { img_url, img_name } = this.curSelectObj;
          obj = this.comOptions(
            res,
            img_url,
            img_name,
            "img_url",
            "img_name",
            type
          );
          break;
        case 3:
          let { audio_url, audio_name } = this.curSelectObj;
          obj = this.comOptions(
            res,
            audio_url,
            audio_name,
            "audio_url",
            "audio_name",
            type
          );
          break;
        case 4:
          let { video_url, video_name } = this.curSelectObj;
          obj = this.comOptions(
            res,
            video_url,
            video_name,
            "video_url",
            "video_name",
            type
          );
          break;
        default:
          break;
      }
      let { id } = this.curSelectObj;
      obj = Object.assign({}, obj, { id });
      return obj;
    },

    comOptions(res, mURL, mName, mkURL, mkName, type) {
      let { originalname, filename, imgURL, title } = res;
      let imgUrlArr = mURL ? mURL.split(",") : [];
      let imgNameArr = mName ? mName.split(",") : [];
      if (type == "update") {
        imgUrlArr.push(filename);
        imgNameArr.push(originalname);
      } else {
        let index = imgUrlArr.findIndex((item) => imgURL.includes(item));
        imgUrlArr.splice(index, 1);
        imgNameArr.splice(index, 1);
      }
      let obj = {};
      obj[mkURL] = imgUrlArr.join(",");
      obj[mkName] = imgNameArr.join(",");
      return obj;
    },

    async deleleMedia(obj) {
      this.infoList = [];
      let res = await this.comPopOptions(obj, this.popType, "del");
      res = Object.assign({}, res, { id: this.curSelectObj.id });
      this.updateUser(res);
    },

    async uploadMedia(formData) {
      let { code, data } = await this.$post(this.$api.uploadfile, formData);
      if (code == -1) {
        await msgbox({ msg: data });
        return;
      }
      let obj = this.handlerPopType(data);
      this.updateUser(obj);
    },

    async showPop(obj, index) {
      console.log(obj);
      this.curSelectObj = obj;
      let curPopIndex = index + 1;
      this.curPopIndex = curPopIndex;
      let list = await this.comPopOptions(obj, curPopIndex);
      if (this.popType == 10) {
        this.title = "编辑工作";
      } else {
        this.title = "媒体列表";
      }
      if (this.popType == 11) return;
      this.infoList = list;

      this.$store.commit("isShowPopWrapper", new Date().getTime());
    },

    delMediaHandler(mediaUrl, mkey, mname) {
      let nameArr = this.curSelectObj[mname].split(",");
      let urlArr = this.curSelectObj[mkey].split(",");
      let index = urlArr.findIndex((item) => mediaUrl.includes(item));

      nameArr.splice(index, 1);
      urlArr.splice(index, 1);

      let obj = {};
      obj[mname] = nameArr.join(",");
      obj[mkey] = urlArr.join(",");

      return obj;
    },

    async comPopOptions(obj, index, type = "show") {
      let list = [];
      let popType = index;
      switch (index) {
        case 1:
          this.mtype = "图片";
          if (type == "show") {
            let { cover_url, cover_name } = obj;
            this.accept = ".jpg, .jpeg, .png, .gif,.bmp";
            if (!cover_url) break;
            list = this.curObjDataHandler(cover_name, cover_url);
          }
          if (type == "del") {
            let { imgURL, title } = obj;
            list = this.delMediaHandler(imgURL, "cover_url", "cover_name");
          }
          break;
        case 2:
          this.mtype = "图片";
          if (type == "show") {
            let { img_url, img_name } = obj;
            this.accept = ".jpg, .jpeg, .png, .gif,.bmp";
            if (!img_url) break;
            list = this.curObjDataHandler(img_name, img_url);
          }

          if (type == "del") {
            let { imgURL, title } = obj;
            list = this.delMediaHandler(imgURL, "img_url", "img_name");
          }
          break;
        case 3:
          this.mtype = "音频";
          if (type == "show") {
            let { audio_name, audio_url } = obj;
            this.accept = ".mp3";
            if (!audio_url) break;
            list = this.curObjDataHandler(audio_name, audio_url);
          }
          if (type == "del") {
            let { imgURL, title } = obj;
            list = this.delMediaHandler(imgURL, "audio_url", "audio_name");
          }

          break;
        case 4:
          this.mtype = "视频";
          if (type == "show") {
            let { video_name, video_url } = obj;
            this.accept = ".mp4";
            if (!video_url) break;
            list = this.curObjDataHandler(video_name, video_url);
          }
          if (type == "del") {
            let { imgURL, title } = obj;
            list = this.delMediaHandler(imgURL, "video_url", "video_name");
          }

          break;
        case 5:
          popType = 10;
          let cList = JSON.parse(JSON.stringify(works));
          for (let [key, value] of Object.entries(obj)) {
            if (!value) continue;
            let obj = cList.find((item) => item.mkey == key);
            if (!obj) continue;
            obj["inputText"] = value;
          }
          list = cList;
          break;
        case 6:
          popType = 11;
          let { id } = obj;
          let flag = await msgbox({
            msg: "是否删除此工作记录?",
            showCancelButton: true,
          });
          if (flag) {
            this.deleteUser(id);
          }
          break;
        default:
          break;
      }

      this.popType = popType;
      return list;
    },

    async deleteUser(id) {
      let url = this.$api.delwork;
      let { code, data } = await this.$get(url, { id });
      if (code != 0) {
        await msgbox({ msg: "出错了" });
        return;
      } else {
        await msgbox({ msg: data });
      }
      this.search();
    },

    currentChange(pageIndex) {
      this.curIndex = pageIndex;
      this.search();
    },
    curObjDataHandler(nameStr, urlStr) {
      let nameArr = nameStr.split(",");
      let urlArr = urlStr.split(",");
      let temList = [];
      nameArr.forEach((item, index) => {
        temList.push({
          imgURL: showImgURL + urlArr[index],
          title: item,
        });
      });
      return temList;
    },
    resetData() {
      this.name = "";
      this.addr = "";
      this.successor_level = "全部";
      this.advancedSearch.forEach((item) => {
        item.inputText = "";
      });
    },
    async search() {
      let obj = {
        d_type: this.successor_level,
      };
      if (this.name) {
        obj = Object.assign({}, obj, { name: this.name });
      }
      if (this.addr) {
        obj = Object.assign({}, obj, { addr: this.addr });
      }

      let advancedSearch = {};
      for (let obj of this.advancedSearch) {
        if (!obj.inputText) continue;
        advancedSearch[obj.mkey] = obj.inputText;
      }

      if (JSON.stringify(advancedSearch) != "{}") {
        obj = Object.assign({}, obj, advancedSearch);
      }

      let pageobj = {
        size: this.pageSize,
        index: this.curIndex,
      };
      obj = Object.assign({}, obj, pageobj);
      this.dialogVisible = false;
      console.log("--search---", obj);
      let res = await this.$get(this.$api.getwork, obj);
      let { total, user } = res.data;
      user.forEach((item, index) => {
        item.create_time = toLocalDate(item.create_time);
        item.num = index + 1 + (this.curIndex - 1) * this.pageSize;
      });
      this.tableData = user;
      console.log(user);
      this.getCurObj();
      this.$store.commit("pageCount", total);
      // this.resetData();
    },

    async getCurObj() {
      let { id } = this.curSelectObj;
      let obj = this.tableData.find((item) => item.id == id);
      if (!obj) return;
      this.curSelectObj = obj;

      let list = await this.comPopOptions(obj, this.curPopIndex, "show");

      this.infoList = list;
    },

    clearInput() {
      this.dialogVisible = false;
      this.advancedSearch.forEach((item) => {
        item.inputText = "";
      });
    },
    handleClick(row) {
      // console.log(row);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
#people-manage {
  position: relative;
  height: 100%;
  display: flex;
  //   flex-wrap: wrap;
  flex-direction: column;
  padding: 10px 10px 30px 10px;
  box-sizing: border-box;
  font-size: 14px;

  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex: 0 0 70px;

    .item {
      display: flex;
      align-items: center;
      margin-right: 10px;

      .title {
        flex: 0 0 80px;
      }

      .input {
        // max-width: 130px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        border: 1px solid gray;
      }
    }

    .btn {
      border-radius: 3px;
      padding: 8px 20px;
    }
  }

  .table-box {
    width: 100%;
    max-height: 100%;
    // height: 100%;
    // border: 3px solid red;
    overflow-y: scroll;
  }

  .footer {
    flex: 0 0 40px;
  }

  .dialog {
    padding: 10px;
  }

  .advanced-search-box {
    .item {
      display: flex;
      align-items: center;
      padding: 5px 0;

      .title {
        flex: 0 0 80px;
      }

      .input {
        width: 100%;
      }
    }
  }
}

.op-btn {
  padding: 3px 6px;
  margin-left: 2px;
  border-radius: 1px;
  font-size: 12px;
}
</style>

<style lang="scss" >
.el-dialog__body {
  padding: 10px;
}

.el-table .el-table__cell {
  padding: 5px 0;
  color: #000;
}
</style>