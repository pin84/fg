<template>
  <div id="people-manage">
    <div class="search-box">
      <li class="item">
        <span class="title">用户名</span>
        <input class="input" v-model="name" placeholder="请输入内容" />
      </li>
      <el-button @click="search" class="btn" type="primary">查询</el-button>
      <el-button
        v-if="jurisdiction.includes('1')"
        @click="addType"
        class="btn"
        type="info"
        >新增</el-button
      >
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
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="isShowOperate">
            <el-button

              v-show="item.isShow && scope.row.username != 'admin'"
              class="op-btn"
              :type="item.type || 'success'"
              size="mini"
              @click="showPop(scope.row, index)"
              v-for="(item, index) in btnList"
              :key="index"
              >{{ item.name }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else style="padding: 30px">暂无数据</div>
    <div class="footer">
      <Pagination @currentChange="currentChange" />
    </div>

    <ShowMediaPop
      v-if="$store.state.v1.isShowPopWrapper"
      :list="infoList"
      :popType="popType"
      :title="title"
      :accept="accept"
      :mtype="mtype"
      @editInfo="editInfo"
    />
  </div>
</template>

<script>
import { showImgURL } from "@/config/config.js";
import ShowMediaPop from "@/views/components/ShowMediaPop.vue";
import { msgbox, toLocalDate } from "@/utils/utils.js";
import { myDelete } from "@/utils/myhelper.js";
import Pagination from "@/views/components/Pagination.vue";
export default {
  data() {
    return {
      mtype: "图片",
      title: "媒体列表",
      curIndex: 1,
      pageSize: 5,
      name: "",
      addr: "",
      successor_level: "全部",

      tableData: [],
      tableLineList: [
        {
          prop: "username",
          label: "用户名",
          width: "150",
        },
        {
          prop: "nickname",
          label: "昵称",
          width: "250",
        },
        {
          prop: "create_time",
          label: "注册时间",
          width: "250",
        },
      ],
      btnList: [
        {
          name: "编辑",
          type: "primary",
          isShow: true,
        },
        {
          name: "删除",
          type: "danger",
          isShow: localStorage.getItem("jurisdiction").split(",").includes("5"),
        },
      ],
      infoList: [
        {
          title: "用户名",
          mkey: "username",
        },
        {
          title: "昵称",
          mkey: "nickname",
        },
        {
          title: "密码",
          mkey: "pwd",
          inputType: 4,
        },
        {
          title: "确认密码",
          mkey: "repwd",
          inputType: 4,
        },

        {
          title: "权限",
          mkey: "showJurisdiction",
          inputType: 5,
          dropdownList: [],
          inputText: [],
        },
      ], //info
      popType: 1, //传给pop用
      curPopIndex: 1, //本页面用
      curSelectObj: {},
      accept: ".jpg, .jpeg, .png, .gif,.bmp",
      optionType: "update",
      jurisdictionList: [
        {
          name: "创建用户",
          jurisdictionType: 1,
        },
        {
          name: "上传资料",
          jurisdictionType: 2,
        },
        {
          name: "修改资料",
          jurisdictionType: 3,
        },
        {
          name: "删除资料",
          jurisdictionType: 4,
        },
        {
          name: "删除用户",
          jurisdictionType: 5,
        },
        {
          name: "编辑用户",
          jurisdictionType: 6,
        },
        {
          name: "浏览手机端", //只能在前端页面浏览
          jurisdictionType: 10,
        },
      ],
      jurisdiction: [],
      isShowOperate: true,
    };
  },
  components: {
    ShowMediaPop,
    Pagination,
  },
  created() {
    this.initData();
    this.search();
  },
  methods: {
    initData() {
      this.pageSize = this.$store.state.v1.pageSize;

      let arr = this.jurisdictionList.map((item) => item.name);
      this.infoList[4].dropdownList = arr;

      this.jurisdiction = localStorage.getItem("jurisdiction").split(",");
      this.isShowOperate = localStorage
        .getItem("jurisdiction")
        .split(",")
        .includes("6");
    },
    addType() {
      this.optionType = "add";
      this.popType = 10;
      this.$store.commit("isShowPopWrapper", new Date().getTime());
    },
    async editInfo() {
      let obj = {};
      if (this.optionType == "update") {
        let { pwd } = this.curSelectObj;
        let { inputText } = this.infoList.find((item) => item.mkey == "repwd");
        if (pwd != inputText) {
          await msgbox({
            msg: "原密码不正确",
          });
          return;
        }
        let keyArr = ["prPwd", "repwd"];
        for (let item of this.infoList) {
          if (keyArr.includes(item.mkey)) continue;

          if (item.mkey == "showJurisdiction") {
            if (!item.inputText.length) continue;
            let arr = [];
            item.inputText.forEach((jurisdiction) => {
              let { jurisdictionType } = this.jurisdictionList.find(
                (jobj) => jobj.name == jurisdiction
              );
              arr.push(jurisdictionType);
            });
            // localStorage.setItem('jurisdiction',arr.join(","))
            obj["jurisdictionList"] = arr.join(",");
            continue;
          }

          obj[item.mkey] = item.inputText;
        }
        let { id } = this.curSelectObj;
        obj = Object.assign({}, obj, { id });
        this.updateUser(obj);
      } else {
        let inputPwd = this.infoList.find(
          (item) => item.mkey == "pwd"
        ).inputText;
        let inputRepwd = this.infoList.find(
          (item) => item.mkey == "repwd"
        ).inputText;
        if (inputPwd != inputRepwd) {
          await msgbox({
            msg: " 两次密码不一致",
          });
          return;
        }
        for (let item of this.infoList) {
          console.log("--item--", item);
          if (item.mkey == "repwd") continue;
          if (item.mkey == "showJurisdiction") {
            if (!item.inputText.length) continue;
            let arr = [];
            item.inputText.forEach((jurisdiction) => {
              let { jurisdictionType } = this.jurisdictionList.find(
                (jobj) => jobj.name == jurisdiction
              );
              arr.push(jurisdictionType);
            });

            obj["jurisdictionList"] = arr.join(",");
            continue;
          }
          obj[item.mkey] = item.inputText;
        }

        this.optionType = "update";
        this.addconfig(obj);
      }
    },

    async addconfig(obj) {
      obj = Object.assign({}, obj, { datatype: "2" });

      let { code, data } = await this.$post(this.$api.addconfig, obj);

      this.search();
      await msgbox({
        msg: data,
      });

      // if (code == -1) return

      this.$store.commit("isShowPopWrapper", 0);
    },

    async updateUser(params) {
      let url = this.$api.updateconfig;
      let { code, data } = await this.$post(url, params);
      await msgbox({
        msg: data,
      });
      if (code == -1) return;

      if (this.popType == 10) {
        this.$store.commit("isShowPopWrapper", 0);
      }

      this.resetData();

      this.search();
    },

    async showPop(obj, index) {
      console.log(obj);
      this.curSelectObj = obj;
      let curPopIndex = index + 1;
      this.curPopIndex = curPopIndex;
      let list = await this.comPopOptions(obj, curPopIndex);
      if (this.popType == 10) {
        this.title = "编辑用户";
      } else {
        this.title = "媒体列表";
      }
      if (this.popType == 11) return;
      this.infoList = list;
      this.$store.commit("isShowPopWrapper", new Date().getTime());
    },

    async comPopOptions(obj, index, type = "show") {
      let list = [];
      let popType = index;
      switch (index) {
        case 1:
          popType = 10;
          let cList = JSON.parse(JSON.stringify(this.infoList));
          let keyArr = ["prPwd", "pwd", "repwd"];
          for (let item of cList) {
            if (keyArr.includes(item.mkey)) continue;

            if (item.mkey == "showJurisdiction") {
              let temArr = obj.jurisdictionList.split(",");
              let arr = [];
              temArr.forEach((num) => {
                let { name } = this.jurisdictionList.find(
                  (o) => o.jurisdictionType == num
                );
                arr.push(name);
              });
              item["inputText"] = arr;
              continue;
            }

            item["inputText"] = obj[item.mkey];
          }
          list = cList;
          break;
        case 2:
          popType = 11;
          let { id } = obj;
          let flag = await msgbox({
            msg: "是否删除此用户?",
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
      let url = this.$api.delconfig;
      await myDelete(url, id);
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
      for (let item of this.infoList) {
        if (item.mkey == "showJurisdiction") {
          item.inputText = [];
          continue;
        }
        item.inputText = "";
      }
    },
    async search() {
      let obj = {
        // d_type: this.successor_level,
      };
      if (this.name) {
        obj = Object.assign({}, obj, { username: this.name });
      }

      let pageobj = {
        size: this.pageSize,
        index: this.curIndex,
        datatype: "2",
      };
      obj = Object.assign({}, obj, pageobj);

      let res = await this.$get(this.$api.getconfig, obj);
      let { config: list, total } = res.data;
      list.forEach((item, index) => {
        item.create_time = toLocalDate(item.create_time);
        item["num"] = index + 1;
      });
      this.tableData = list;
      console.log(list);
      this.$store.commit("pageCount", total);
      this.resetData();
    },
    async getCurObj() {
      let { id } = this.curSelectObj;
      let obj = this.tableData.find((item) => item.id == id);
      if (!obj) return;
      this.curSelectObj = obj;
      let list = await this.comPopOptions(obj, this.curPopIndex, "show");
      this.infoList = list;
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