<template>
  <div id="aside">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      :default-openeds="defaultopened"
      :default-active="defaultActiv"
    >
      <el-menu-item index="0-0" @click="toAcount('0')">
        <i class="iconfont icon-tongjifenxi-xiangmubiaogetongji"></i>
        <span slot="title">轮播图</span>
      </el-menu-item>
      <el-menu-item index="1-0" @click="toAcount('1')">
        <i class="iconfont icon-tongjifenxi-xiangmubiaogetongji"></i>
        <span slot="title">申请设计师管理</span>
      </el-menu-item>

      <el-submenu
        class="submenu"
        :index="idx + 1 + ''"
        v-for="(item, idx) in list"
        :key="idx"
      >
        <template slot="title">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{ item.type }}</span>
        </template>
        <el-menu-item
          :index="idx + 1 + '-' + (innerIdx + 1)"
          v-for="(obj, innerIdx) in item.subcategory"
          :key="innerIdx"
          @click="selectPage(innerIdx)"
          >{{ obj.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
    <!-- <div class="img-section">
      <div class="img-box">
        <img src="@/assets/images/bg/shuimo.png" alt="" />
      </div>
      <div class="img-box img-box-2">
        <img src="@/assets/images/bg/logintitle.png" alt="" />
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActiv:'0-0',
      curTopIndex: 0,
      curItemIndex: 0,
      defaultopened: [1,0],
      isCollapse: false,
      list: [
        {
          type: "文章管理",
          icon: "icon-addto",
          subcategory: [
            {
              name: "上传",
              url: "/0/0",
            },
            {
              name: "国家政策",
              url: "/0/1",
            },
            {
              name: "特色文化传承",
              url: "/0/2",
            },
            {
              name: "乡村振兴案例",
              url: "/0/3",
            },
            {
              name: "案例分享",
              url: "/0/4",
            },
            {
              name: "驻村书记说简介",
              url: "/0/5",
            },
            {
              name: "驻村书记说新闻",
              url: "/0/6",
            },
            {
              name: "培训信息",
              url: "/0/7",
            },
            {
              name: "建材库",
              url: "/0/8",
            },
          ],
        },
        // {
        //   type: "数据管理",
        //   icon: "icon-data",
        //   subcategory: [
        //     {
        //       name: "传承人管理",
        //       url: "/1/0",
        //     },
        //     {
        //       name: "作品管理",
        //       url: "",
        //     },
        //     {
        //       name: "保护传承工作",
        //       url: "",
        //     },
        //     {
        //       name: "分类管理",
        //       url: "",
        //     },
        //   ],
        // },

        // {
        //   type: "用户管理",
        //   icon: "icon-username",
        //   subcategory: [
        //     {
        //       name: "用户管理",
        //       url: "/2/0",
        //     },
        //   ],
        // },

        // {
        //   type: "报表统计",
        //   icon: "icon-baobiao",
        //   subcategory: [
        //     {
        //       name: "传承人统计-月份",
        //       url: "/3/0",
        //     },

        //     {
        //       name: "传承人统计-分类",
        //       url: "/3/1",
        //     },

        //     {
        //       name: "作品统计-月份",
        //       url: "/3/2",
        //     },
        //     {
        //       name: "作品统计-分类",
        //       url: "/3/3",
        //     },
        //     {
        //       name: "工作统计-月份",
        //       url: "/3/4",
        //     },
        //     {
        //       name: "工作统计-分类",
        //       url: "/3/5",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    toAcount(curTopIndex) {
      this.$emit("selectPage", `/${curTopIndex}/0`);
    },
    selectPage(idx) {
      this.curItemIndex = idx;
      let curPage = `/${this.curTopIndex}/${this.curItemIndex}`;
      this.$emit("selectPage", curPage);
    },
    handleOpen(key, keyPath) {
      this.curTopIndex = Number(key) + 1;
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" >
.el-menu-item {
  text-align: left;
  background-color: rgba(238, 238, 238, 0.98);
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
}

.el-submenu__title {
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 10px;
  padding-left: 10px !important;

  .el-submenu__icon-arrow {
    position: relative;
    top: 0;
    margin-top: 0;
    margin-left: 80px;
  }
}
</style>
<style lang="scss" scoped>
#aside {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(238, 238, 238, 0.98);
  user-select: none;

  .el-menu-vertical-demo {
    .submenu {
      background-color: rgba(238, 238, 238, 0.98);
      border-bottom: 1px solid #ccc;
    }
  }

  .iconfont {
    font-size: 18px;
  }

  .img-section {
    margin-top: 50px;

    .img-box {
      width: 100%;
    }

    .img-box-2 {
      margin-top: 20px;
    }
  }
}
</style>