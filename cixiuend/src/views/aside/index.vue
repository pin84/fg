<template>
  <div id="aside">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      :default-openeds="defaultopened"
      default-active="0-0"
    >
      <el-menu-item index="0-0" @click="toAcount">
        <i class="iconfont icon-tongjifenxi-xiangmubiaogetongji"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-submenu
        class="submenu"
        :index="idx + 1 + ''"
        v-for="(item, idx) in list"
        :key="idx"
        v-show="item.isShow"
      >
        <template slot="title">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{ item.type }}</span>
        </template>
        <el-menu-item
          :index="idx + 1 + '-' + (innerIdx + 1)"
          v-for="(obj, innerIdx) in item.subcategory"
          :key="innerIdx"
          @click="selectPagea(obj, innerIdx)"
          >{{ obj.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
    <div class="img-section">
      <div class="img-box">
        <img src="@/assets/images/bg/shuimo.png" alt="" />
      </div>
      <div class="img-box img-box-2">
        <img src="@/assets/images/bg/logintitle.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curTopIndex: 0,
      curItemIndex: 0,
      defaultopened: [1],
      isCollapse: false,
      list: [
        {
          type: "添加数据",
          icon: "icon-addto",
          subcategory: [
            {
              name: "传承人录入",
              url: "/0/0",
            },
            {
              name: "作品录入",
              url: "/0/1",
            },
            {
              name: "保护传承工作",
              url: "",
            },
          ],
          isShow:localStorage.getItem("jurisdiction").split(",").includes('2')

        },
        {
          type: "数据管理",
          icon: "icon-data",
          isShow:true,
          subcategory: [
            {
              name: "传承人管理",
              url: "/1/0",
            },
            {
              name: "作品管理",
              url: "",
            },
            {
              name: "保护传承工作",
              url: "",
            },
          ],
        },

        {
          type: "报表统计",
          icon: "icon-baobiao",
          isShow:true,
          subcategory: [
            {
              name: "传承人统计-月份",
              url: "/2/0",
            },

            {
              name: "传承人统计-分类",
              url: "/2/1",
            },

            {
              name: "作品统计-月份",
              url: "/2/2",
            },
            {
              name: "作品统计-分类",
              url: "/2/3",
            },
            {
              name: "工作统计-月份",
              url: "/2/4",
            },
            {
              name: "工作统计-分类",
              url: "/2/5",
            },
          ],
        },
        {
          type: "系统管理",
          icon: "icon-setting",
          isShow:true,
          subcategory: [
            {
              name: "分类管理",
              url: "/3/0",
            },
            // {
            //   name: "用户管理",
            //   url: "/3/1",
            // },

            {
              name: "角色管理",
              url: "/3/1",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toAcount() {
      this.$emit("toAcount");
    },
    selectPagea(item, idx) {
      this.curItemIndex = idx;
      let curPage = `/${this.curTopIndex}/${this.curItemIndex}`;
      this.$emit("selectPage", curPage);
    },
    handleOpen(key, keyPath) {
      this.curTopIndex = key - 1;
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