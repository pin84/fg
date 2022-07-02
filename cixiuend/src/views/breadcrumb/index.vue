<template>
  <div id="bread">
    <ul class="top">
      <li
        @click="toPage(item, idx)"
        class="tab pointer"
        :class="{ active: idx == curIdx }"
        v-for="(item, idx) in list"
        :key="idx"
      >
        <span class="tab-text">{{ item.name }}</span>
        <i class="iconfont icon-guanbi"></i>
      </li>
    </ul>

    <el-breadcrumb class="bottom" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curIdx: 0,
      list: [
        {
          url: "",
          name: "abc",
        },
        {
          url: "",
          name: "abcsdf",
        },
        {
          url: "",
          name: "abc",
        },
      ],
    };
  },

  methods: {
    toPage(item, idx) {
      this.curIdx = idx;
    },
  },
};
</script>

<style lang="scss" scoped>
#bread {
  width: 100%;
  // border: 1px solid red;
  user-select: none;
  padding-top: 5px;
  box-sizing: border-box;

  .top {
    // height: 60px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    .tab {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      min-width: 50px;
      box-sizing: border-box;
      height: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      &::before {
        content: ""; /* 用伪元素来生成一个矩形 */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #999;
        border: 1px solid gray;
        transform: perspective(0.5em) rotateX(5deg);
      }
      &.active {
        &::before {
          background: #fff;
        }
      }
      .tab-text {
        width: 100%;
        text-align: center;
        color: #222;
      }
      .iconfont {
        width: 40px;
        &:hover {
          color: red;
        }
      }
    }
  }
  .bottom{
    background-color: #f5f5f5;
    padding: 10px 20px;
  }
}
</style>