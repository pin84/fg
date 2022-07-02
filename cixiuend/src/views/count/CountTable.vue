<template>
  <div id="count-table">
    <div class="list title">
      <li class="item" v-for="(item, idx) in topList" :key="idx">{{ item }}</li>
    </div>
    <div class="box">
      <div class="list pointer" @click="toDetail(item,idx)" v-for="(item, idx) in typeArr" :key="idx">
        <li class="item">{{ item }}</li>
        <li class="item">{{ numArr[idx] }}</li>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    topList: {
      type: Array,
      default: () => ['统计月份', '传承人总数']
    },
    numArr: {
      type: Array,
      default: () => [1, 2, 3]
    },
    typeArr: {
      type: Array,
      default: () => ['2022-04', '2022-05']
    }
  },
  data() {
    return {

    }
  },

  methods: {
    toDetail(item,idx) {
      console.log(item,idx);
      this.$emit('toDetail',item,idx)
    }
  }
}
</script>

<style lang="scss" scoped>
#count-table {

  // border: 1px solid red;
  .list {
    display: flex;

    &:hover {
      background-color: #f1f1f1;
    }

    .item {
      padding: 8px 0;
      width: 50%;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

    }
  }

  .title {
    .item {
      background-color: #f5fafe;
      font-weight: 600;

    }
  }

  .box {
    display: flex;
    flex-direction: column;
  }
}
</style>