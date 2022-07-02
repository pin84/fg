<template>
  <div class="acount">
    <ul class="list" v-if="isShowAcount">
      <li class="item item-1">
        <Bar :d="d" />
        <Pie :d="d" />
        <Bar :d="d1" title="作品分布" />
        <Pie :d="d1" title="作品占比" />
      </li>
    </ul>
    <div style="padding: 20px; user-select: none"></div>
    <ul class="list" v-if="isShowAcount">
      <li class="item item-1">
        <Bar :d="d2" title="工作数分布" />
        <Pie :d="d2" title="工作数占比" />
      </li>
    </ul>
    <div style="padding: 20px; user-select: none"></div>
    <ul class="list" v-if="isShowAcount">
      <li class="item item-1">
        <Bar :d="d3" title="近6个月添加传承人分布" />
        <LineD :d="d3" title="近6个月添加传承人趋势" />
        <Pie :d="d3" title="近6个月添加传承人占比" />
      </li>
    </ul>
    <div style="padding: 20px; user-select: none"></div>
    <ul class="list" v-if="isShowAcount">
      <li class="item item-1">
        <Bar :d="d4" title="近6个月添加作品分布" />
        <LineD :d="d4" title="近6个月添加作品趋势" />
        <Pie :d="d4" title="近6个月添加作品占比" />
      </li>
    </ul>
    <div style="padding: 20px; user-select: none"></div>
    <ul class="list" v-if="isShowAcount">
      <li class="item item-1">
        <Bar :d="d5" title="近6个月添加工作数分布" />
        <LineD :d="d5" title="近6个月添加工作数趋势" />
        <Pie :d="d5" title="近6个月添加工作数占比" />
      </li>
    </ul>
  </div>
</template>
<script>
import Bar from "@/views/acount/Bar.vue";
import Pie from "@/views/acount/Pie.vue";
import LineD from "@/views/acount/Line.vue";
import { toLocalDate } from "@/utils/utils.js";
export default {
  components: {
    Bar,
    Pie,
    LineD,
  },

  data() {
    return {
      d: {},
      d1: {},
      d2: {},
      d3: {},
      d4: {},
      d5: {},
      isShowAcount: false,
      month: 1000 * 60 * 60 * 24 * 30,
    };
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      this.isShowAcount = false;

      let { res, data } = await this.$get(this.$api.getall);
      let { user, play, work } = data;

      let userData = this.dataHandler(user);
      this.d["bar"] = userData[0];
      this.d["barNum"] = userData[1];

      let playData = this.dataHandler1(play, "d_type");
      this.d1["bar"] = playData[0];
      this.d1["barNum"] = playData[1];


      let workData = this.dataHandler(work, "d_type");
      this.d2["bar"] = workData[0];
      this.d2["barNum"] = workData[1];

      let userDataByMonth = this.dataHandlerBymonth(user);
      this.d3["bar"] = userDataByMonth[0];
      this.d3["barNum"] = userDataByMonth[1];

      let playDataByMonth = this.dataHandlerBymonth(play);
      this.d4["bar"] = playDataByMonth[0];
      this.d4["barNum"] = playDataByMonth[1];

      let workDataByMonth = this.dataHandlerBymonth(work);
      this.d5["bar"] = workDataByMonth[0];
      this.d5["barNum"] = workDataByMonth[1];

      // console.log(this.d1);
      // console.log(user, play, work);
      this.isShowAcount = true;
    },

    dataHandlerBymonth(user) {
      let n = new Date().getTime();
      let bar = [];
      let barNum = [];
      for (let i = 6; i > 0; i--) {
        let arr = toLocalDate(n - i * this.month).split("/");
        let d = arr[0] + "-" + (arr[1] < 10 ? "0" + arr[1] : arr[1]);
        bar.push(d);
      }

      for (let d of bar) {
        let num = user.filter((item) => {
          let a = new Date(item.create_time.slice(0, 7)).getTime();
          let b = new Date(d).getTime();
          return a == b;
        });
        barNum.push(num.length);
      }
      // console.log(bar, barNum);
      return [bar, barNum];
    },

    dataHandler1(arr) {
      let typeObj = {};
      for (let obj of arr) {
        let tem = obj.d_type.split(",");
        tem.forEach((type) => {
          if (typeObj[type]) {
            typeObj[type] = typeObj[type] + 1;
          } else {
            typeObj[type] = 1;
          }
        });
      }

      let bar = [],
        barNum = [];
      for (let [key, value] of Object.entries(typeObj)) {
        bar.push(key);
        barNum.push(value);
      }
  console.log(bar,barNum);
      return [bar, barNum];
    },

    dataHandler(arr, mkey = "classify_name") {
      let tem = {};
      for (let obj of arr) {
        if (tem[obj[mkey]]) {
          tem[obj[mkey]] = tem[obj[mkey]] += 1;
        } else {
          tem[obj[mkey]] = 1;
        }
      }
      // console.log(tem);
      let bar = [];
      let barNum = [];
      for (let [key, value] of Object.entries(tem)) {
        bar.push(key);
        barNum.push(value);
      }
      return [bar, barNum];
    },
  },
};
</script>
<style lang="scss" scoped>
.acount {
  padding: 20px 0;
  .list {
    .item {
      display: flex;
    }
  }
}
</style>