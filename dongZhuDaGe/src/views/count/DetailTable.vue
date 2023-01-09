<template>
  <div id="count-table">
    <div class="list title">
      <li class="item" v-for="(item, idx) in topList" :key="idx">{{ item }}</li>
    </div>
    <div class="box">
      <div v-if="listType==1" class="list"  v-for="(item, idx) in list" :key="idx">
        <li class="item">{{ item.name }}</li>
        <li class="item">{{ item.sex }}</li>
        <li class="item">{{ item.nation }}</li>
        <li class="item">{{ item.phone }}</li>
        <li class="item">{{ item.addr }}</li>
      </div>
      <div v-if="listType==2"   class="list"  v-for="(item, idx) in list" :key="idx">
        <li class="item">{{ item.name }}</li>
        <li class="item">{{ item.playwright }}</li>
        <li class="item">{{ item.create_time }}</li>
      </div>
      <div v-if="listType==3"   class="list"  v-for="(item, idx) in list" :key="idx">
        <li class="item">{{ item.name }}</li>
        <li class="item">{{ item.d_type }}</li>
        <li class="item">{{ item.content }}</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topList: {
      type: Array,
      default: () => ['姓名', '性别', '民族', '联系方式','地址']
    },
    list: {
      type: Array,
      default: () => [{}]
    },
    listType:{
      type:Number,
      default:()=>1
    }
  },
  data() {
    return {

    }
  },

  methods: {
 
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