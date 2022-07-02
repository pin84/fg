<template>
  <div id="people-manage">
    <div class="top">
      <el-button @click="changeType(idx)" class="top-btn" :type="curTopBtnIndex == idx ? 'primary' : ''"
        v-for="(item, idx) in topBtnList" :key="idx">{{ item.text }}</el-button>
    </div>
    <div class="search-box" v-if="!curTopBtnIndex">
      <li class="item">
        <span class="title">汇总时间</span>
        <el-date-picker v-model="curType" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </li>
      <el-button @click="initData" class="btn" type="primary">查询</el-button>
    </div>

    <div v-if="typeArr.length" class="table-box">
      <CountTable v-if="!curTopBtnIndex" :numArr="numArr" :typeArr="typeArr" @toDetail="toDetail"  :topList=" ['传承人类型', '传承人总数']"/>
      <DetailTable v-else :list="filterList" />
    </div>

    <div v-else style="padding: 30px">暂无数据</div>
    <div class="footer">
      <Pagination @currentChange="currentChange" />
    </div>

  </div>
</template>

<script>
import ShowMediaPop from "@/views/components/ShowMediaPop.vue";
import { msgbox } from "@/utils/utils.js";
import { myDelete } from "@/utils/myhelper.js";
import Pagination from "@/views/components/Pagination.vue";
import CountTable from '@/views/count/CountTable.vue'
import { inputList } from '@/config/configData.js'
export default {
  data() {
    return {
      topBtnList: [
        { id: 0, text: '数据汇总' },
        { id: 1, text: '数据明细' },
      ],
      curTopBtnIndex: 0,
      curType: ['2022-04-01', '2022-04-30'],
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
    this.setCurDate()
    this.initData()
  },
  methods: {
    setCurDate() {
      let d = new Date()
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      this.curType = [`${year}-${month}-01`, `${year}-${month}-30`]
    },
    async toDetail(item, idx) {
      this.curMonth = item
      let d = { index: this.pageIndex, month: JSON.stringify(this.curType), classify_name: this.curMonth  }
      let { code, data } = await this.$get(this.$api.getuserbytype, d)
      this.curTopBtnIndex = 1
      this.filterList = data.list
      this.$store.commit("pageCount", data.len);
    },
    async initData() {
      let d = {
        month: JSON.stringify(this.curType),
        size: 999,
        index: 1,
      }
      let { code, data } = await this.$get(this.$api.getuserbytype, d)
      let typeArr = []
      this.allData = data.list
      console.log(data.list);
      this.allData.forEach(item => {
        let ct = item.classify_name
        let index = typeArr.findIndex(d => d == ct)
        if (index == -1) {
          typeArr.push(ct)
        }
      });
      let numArr = []
      typeArr.forEach(date => {
        let len = this.allData.filter(item => item.classify_name == date).length
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