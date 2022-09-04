<template>
  <div id="people-manage">
    <div class="search-box">
      <li class="item">
        <span class="title">分类名称</span>
        <input class="input" v-model="name" placeholder="请输入内容" />
      </li>
      <el-button @click="search" class="btn" type="primary">查询</el-button>
      <el-button @click="addType" class="btn" type="info">新增</el-button>
    </div>

    <div v-if="tableData.length" class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
          v-for="(item, index) in tableLineList" :key="index">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-show="item.isShow != 2" class="op-btn" :type="item.type || 'success'" size="mini"
              @click="showPop(scope.row, index)" v-for="(item, index) in btnList" :key="index">{{ item.name }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else style="padding: 30px">暂无数据</div>
    <div class="footer">
      <Pagination @currentChange="currentChange" />
    </div>


    <ShowMediaPop v-if="$store.state.v1.isShowPopWrapper" :list="infoList" :popType="popType" :title="title"
      :accept="accept" :mtype="mtype" @editInfo="editInfo" @changeMedia="uploadMedia" @deleleMedia='deleleMedia' />
  </div>
</template>

<script>
import { showImgURL } from "@/config/config.js";
import ShowMediaPop from "@/views/components/ShowMediaPop.vue";
import { msgbox } from "@/utils/utils.js";
import { myDelete } from "@/utils/myhelper.js";
import Pagination from "@/views/components/Pagination.vue";
export default {
  data() {
    return {
      mtype: '图片',
      title: "媒体列表",
      curIndex: 1,
      pageSize: 10,
      name: "",
      addr: "",
      successor_level: "全部",

      tableData: [],
      tableLineList: [
        {
          prop: "num",
          label: "序列",
          width: "100",
        },
        {
          prop: "d_type",
          label: "分类类型",
          width: "250",
        },
        {
          prop: "name",
          label: "分类名称",
          width: "250",
        },

      ],
      btnList: [
        {
          name: "封面",
          type: "success",
          isShow: 2,
        },
        {
          name: "图片",
          isShow: 2,
        },
        {
          name: "矢量文件",
          isShow: 2,
        },
        {
          name: "视频",
          isShow: 2,
        },
        {
          name: "编辑",
          type: "primary",
        },
        {
          name: "删除",
          type: "danger",
        },
      ],
      infoList: [], //info
      popType: 1, //传给pop用
      curPopIndex: 1,//本页面用
      curSelectObj: {},
      accept: ".jpg, .jpeg, .png, .gif,.bmp",
      optionType: 'update'
    };
  },
  components: {
    ShowMediaPop,
    Pagination,
  },
  created() {
    this.initData()
    this.search();
  },
  methods: {
    initData() {
      this.pageSize = this.$store.state.v1.pageSize
    },
    addType() {
      this.optionType = 'add'
      this.popType = 10;
      this.infoList = [{
        title: '分类类型',
        inputType: 1,
        dropdownList: ["作品分类", "传统艺人分类"],
        mkey: 'd_type',
        inputText: '作品分类'
      },
      {
        title: '分类名称',
        mkey: 'name',
      }]
      let ts = new Date().getTime()
      this.$store.commit("isShowPopWrapper", ts);
    },
    async editInfo() {
      let obj = {};
      this.infoList.forEach((item) => {
        obj[item.mkey] = item.inputText;
      });
      if (this.optionType == 'update') {
        let { id } = this.curSelectObj;
        obj = Object.assign({}, obj, { id });
        console.log(obj);
        this.updateUser(obj);
      } else {
        this.addconfig(obj)
      }
    },

    async addconfig(obj) {
      obj = Object.assign({}, obj, { datatype: '1' })
      let { code, data } = await this.$post(this.$api.addconfig, obj)
      await msgbox({
        msg: data
      })

      console.log( this.optionType);
      if (code == -1) return

      this.$store.commit("isShowPopWrapper", 0);
      this.search()
      let ts = new Date().getTime()
      this.$store.commit("updateType", ts);
    },

    async updateUser(params) {
      let url = this.$api.updateconfig;
      console.log("===obj===", params);
      let { code, data } = await this.$post(url, params);
      await msgbox({
        msg: data
      })
      if (code == -1) return

      if (this.popType == 10) {
        this.$store.commit("isShowPopWrapper", 0);
      }
      this.search();
    },

    handlerPopType(res, type = 'update') {
      let obj = {}
      switch (this.popType) {
        case 1:
          let { filename, originalname } = res
          obj = {
            cover_url: type == 'update' ? filename : '',
            cover_name: type == 'update' ? originalname : ''
          };
          break;
        case 2:
          let { img_url, img_name } = this.curSelectObj;
          obj = this.comOptions(res, img_url, img_name, 'img_url', 'img_name', type)
          break;
        case 3:
          let { audio_url, audio_name } = this.curSelectObj;
          obj = this.comOptions(res, audio_url, audio_name, 'audio_url', 'audio_name', type)
          break;
        case 4:
          let { video_url, video_name } = this.curSelectObj;
          obj = this.comOptions(res, video_url, video_name, 'video_url', 'video_name', type)
          break;
        default:
          break;
      }
      let { id } = this.curSelectObj;
      obj = Object.assign({}, obj, { id });
      return obj
    },

    comOptions(res, mURL, mName, mkURL, mkName, type) {
      let { originalname, filename, imgURL, title } = res
      let imgUrlArr = mURL ? mURL.split(',') : []
      let imgNameArr = mName ? mName.split(',') : []
      if (type == 'update') {
        imgUrlArr.push(filename)
        imgNameArr.push(originalname)
      } else {
        let index = imgUrlArr.findIndex(item => imgURL.includes(item))
        imgUrlArr.splice(index, 1)
        imgNameArr.splice(index, 1)
      }
      let obj = {};
      obj[mkURL] = imgUrlArr.join(',')
      obj[mkName] = imgNameArr.join(',')
      return obj
    },


    async deleleMedia(obj) {
      let res = await this.comPopOptions(obj, this.popType, 'del')
      res = Object.assign({}, res, { id: this.curSelectObj.id })
      this.updateUser(res);
    },

    async uploadMedia(formData) {
      let res = await this.$post(this.$api.uploadfile, formData);
      let obj = this.handlerPopType(res.data)
      this.updateUser(obj);
    },

    async showPop(obj, index) {
      console.log(obj);
      this.curSelectObj = obj;
      let curPopIndex = index + 1
      this.curPopIndex = curPopIndex
      let list = await this.comPopOptions(obj, curPopIndex)
      if (this.popType == 10) {
        this.title = "编辑传承人";
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
      let index = urlArr.findIndex(item => mediaUrl.includes(item))

      nameArr.splice(index, 1)
      urlArr.splice(index, 1)

      let obj = {}
      obj[mname] = nameArr.join(',')
      obj[mkey] = urlArr.join(',')

      return obj;
    },

    async comPopOptions(obj, index, type = 'show') {
      let list = []
      let popType = index

      switch (index) {
        case 1:
          this.mtype = '图片'
          if (type == 'show') {
            let { cover_url, cover_name } = obj;
            this.accept = ".jpg, .jpeg, .png, .gif,.bmp"
            if (!cover_url) break;


            list = this.curObjDataHandler(cover_name, cover_url);
          }
          if (type == 'del') {
            let { imgURL, title } = obj
            list = this.delMediaHandler(imgURL, 'cover_url', 'cover_name');
          }
          break;
        case 2:
          this.mtype = '图片'
          if (type == 'show') {
            let { img_url, img_name } = obj;
            this.accept = ".jpg, .jpeg, .png, .gif,.bmp"
            if (!img_url) break;
            list = this.curObjDataHandler(img_name, img_url);
          }

          if (type == 'del') {
            let { imgURL, title } = obj
            list = this.delMediaHandler(imgURL, 'img_url', 'img_name');
          }
          break;
        case 3:
          this.mtype = '音频'
          if (type == 'show') {
            let { audio_name, audio_url } = obj;
            if (!audio_url) break;
            this.accept = ".mp3";
            list = this.curObjDataHandler(audio_name, audio_url);
          }
          if (type == 'del') {
            let { imgURL, title } = obj
            list = this.delMediaHandler(imgURL, 'audio_url', 'audio_name');
          }

          break;
        case 4:
          this.mtype = '视频'
          if (type == 'show') {
            let { video_name, video_url } = obj;
            if (!video_url) break;
            this.accept = ".mp4";
            list = this.curObjDataHandler(video_name, video_url);
          }
          if (type == 'del') {
            let { imgURL, title } = obj
            list = this.delMediaHandler(imgURL, 'video_url', 'video_name');
          }

          break;
        case 5:
          popType = 10;
          this.optionType = 'update'
          let { d_type, name } = obj
          list = [{
            title: '分类类型',
            inputType: 1,
            dropdownList: ["作品分类", "传统艺人分类"],
            mkey: 'd_type',
            inputText: d_type
          },
          {
            title: '分类名称',
            mkey: 'name',
            inputText: name
          }]
          break;
        case 6:
          popType = 11;
          let { id } = obj;
          let flag = await msgbox({
            msg: "是否删除此分类?",
            showCancelButton: true
          });
          if (flag) {
            this.deleteUser(id);
          }
          break;
        default:
          break;
      }

      this.popType = popType;
      return list
    },

    async deleteUser(id) {
      let url = this.$api.delconfig;
      await myDelete(url, id);

      let ts = new Date().getTime()
      this.$store.commit("updateType", ts);
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
    
    },
    async search() {

      let obj = {
        // d_type: this.successor_level,
      };
      if (this.name) {
        obj = Object.assign({}, obj, { name: this.name });
      }

      let pageobj = {
        size: this.pageSize,
        index: this.curIndex,
        datatype: 1
      };
      obj = Object.assign({}, obj, pageobj);
      let res = await this.$get(this.$api.getconfig, obj);
      console.log(res);
      let { total, config: list } = res.data;
      list.forEach((item, index) => {
        item['num'] = index + 1
      })
      this.tableData = list



      this.$store.commit("pageCount", total);
      let ts = new Date().getTime()
      this.$store.commit("updateType", ts);
      this.resetData();
    },
    async getCurObj() {
      let { id } = this.curSelectObj
      let obj = this.tableData.find(item => item.id == id)
      if (!obj) return
      this.curSelectObj = obj
      let list = await this.comPopOptions(obj, this.curPopIndex, 'show')
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