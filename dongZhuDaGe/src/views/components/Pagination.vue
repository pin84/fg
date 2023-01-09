<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="pageCount"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      pageCount: 0,
      currentPage1: 1,
      pageSize: 10,
    };
  },

  watch: {
    "$store.state.v1.updatePageCount": function (val) {
      this.initData();
    },
    "$store.state.v1.pageCount": function (val) {
      this.changePageCount(val);
    },
  },

  created() {
    this.initData();
  },

  methods: {
    changePageCount(val) {
      this.pageCount = val;
    },
    async initData() {
      this.pageSize = this.$store.state.v1.pageSize
      // this.pageCount = total;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("currentChange", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  border: 1px solid red;
}
</style>