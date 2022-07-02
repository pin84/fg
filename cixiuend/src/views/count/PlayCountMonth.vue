<template>
  <div id="people-manage">
    <div class="top">
      <el-button @click="changeType(idx)" class="top-btn" :type="curTopBtnIndex == idx ? 'primary' : ''"
        v-for="(item, idx) in topBtnList" :key="idx">{{ item.text }}</el-button>
    </div>
    <div class="search-box"  v-if="!curTopBtnIndex">
      <li class="item">
        <span class="title">作品分类</span>
        <select class="input" v-model="curType">
          <option :value="item" v-for="(item, index) in type" :key="index">
            {{ item }}
          </option>
        </select>
      </li>
      <el-button @click="initData" class="btn" type="primary">查询</el-button>
    </div>

    <div v-if="typeArr.length" class="table-box">
      <CountTable v-if="!curTopBtnIndex" :numArr="numArr" :typeArr="typeArr" @toDetail="toDetail"  :topList="topList" />
      <DetailTable v-else :list="filterList" :topList="detailTopList" :listType="2" />
    </div>

    <div v-else style="padding: 30px">暂无数据</div>
    <div class="footer">
      <Pagination @currentChange="currentChange" />
    </div>

  </div>
</template>

<script>
import ShowMediaPop from "@/views/components/ShowMediaPop.vue";
import { msgbox, toLocalDate } from "@/utils/utils.js";
import Pagination from "@/views/components/Pagination.vue";
import CountTable from '@/views/count/CountTable.vue'
import { DongXiData } from '@/config/configData.js'
export default {
  data() {
    return {
      detailTopList:['剧目名称','作者', '制作时间'],
      topList:['统计月份', '作品总数'],
      topBtnList: [
        { id: 0, text: '数据汇总' },
        { id: 1, text: '数据明细' },
      ],
      curTopBtnIndex: 0,
      curType: "全部",
      type: [],
      allData: [],
      typeArr: [],
      numArr: [],
      filterList: [],
      pageIndex: 1,
      curMonth: '2022-04'
    };
  },
  components: {
    ShowMediaPop,
    Pagination,
    CountTable,
    DetailTable: () => import('@/views/count/DetailTable.vue')
  },
  created() {
    this.initPage()
    this.initData()
  },
  methods: {
    initPage(){
      console.log(DongXiData[0].dropdownList);
      let typeList = DongXiData[0].dropdownList
      typeList.unshift('全部')
      this.type = typeList
    },
    async toDetail(item, idx) {
      this.curMonth = item
      let d = { index: this.pageIndex, month: this.curMonth ,d_type:this.curType == '全部'? '' : this.curType  }
      let { code, data } = await this.$get(this.$api.getplaybymonth, d)
      data.list.forEach(item=>{
        item.create_time = toLocalDate(item.create_time)
      })
      console.log(data);
      this.curTopBtnIndex = 1
      this.filterList = data.list
      this.$store.commit("pageCount", data.len);
    },
    async initData() {
      let d = {
        d_type: this.curType ,
        size: 999,
        index: 1,
      }
      let { code, data } = await this.$get(this.$api.getplay, d)
      let typeArr = []
      this.allData = data.user
        console.log( this.allData);
      data.user.forEach(item => {
        let ct = item.create_time.slice(0, 7)
        let index = typeArr.findIndex(d => d == ct)
        if (index == -1) {
          typeArr.push(ct)
        }
      });
      typeArr.sort((a, b) => new Date(a) - new Date(b))
      let numArr = []
      typeArr.forEach(date => {
        let len = data.user.filter(item => item.create_time.includes(date)).length
        numArr.push(len)

      })
      this.typeArr = typeArr
      this.numArr = numArr
    },

    async changeType(idx) {
      this.pageIndex = 1
      this.$store.commit("pageCount", 1);
      if (idx == 1) {
        await msgbox({
          msg: '请选择汇总数据查询明细列表'
        })
        return
      }
      this.curTopBtnIndex = idx

    },

    currentChange(idx) {
      this.pageIndex = idx
      this.toDetail(this.curMonth)
    },
  }

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

  .top {
    display: flex;
    background-color: #f1f1f1;
    padding: 5px 0;

    .top-btn {
      padding: 8px 20px;
    }
  }

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