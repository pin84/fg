<template>
  <div class="header">
    <div class="title"></div>
    <div class="right">
      <span>系统管理员</span>
      <el-dropdown v-if="false"   @command="handleClick" trigger="click">
        <span class="el-dropdown-link">
          用户管理<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in list" :key="index" :command='item'>{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {
          name:'个人信息',
          url:''
        },
        {
          name:'修改密码',
          url:''
        },
        {
          name:'注销',
          url:''
        },
      ]

    }
  },
  methods:{
    handleClick(command){
      console.log(command);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: url("../../assets/images/header/top04.png") no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 0 20px;
  user-select: none;
  .title{
    font-size: 18px;
  }
  .right{
    font-size: 12px;

  .el-dropdown-link{
    color: #fff;
    font-size: 12px;
    margin-left: 20px;
  }
  }
}
</style>