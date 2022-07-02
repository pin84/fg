<template>
  <ul class="my-list">
    <!-- inputType: 1为 select， 2为el-date-picker 3为textarea 4为密码框 -->
    <li
      class="item"
      v-for="(item, idx) in list"
      :key="idx"
      :class="{ 'textarea-item': item.inputType == 3 }"
    >
      <span class="title">{{ item.title }}</span>

      <select
        v-model="item.inputText"
        v-if="item.inputType == 1"
        class="select-list input"
      >
        <option
          :value="text"
          v-for="(text, index) in item.dropdownList"
          :key="index"
        >
          {{ text }}
        </option>
      </select>

      <el-date-picker
        style="width: 100%"
        v-else-if="item.inputType == 2"
        v-model="item.inputText"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>

      <textarea
        class="textarea"
        v-else-if="item.inputType == 3"
        name=""
        id=""
        v-model="item.inputText"
      ></textarea>
      <input
        v-else-if="item.inputType == 4"
        class="select-list input"
        type="password"
        autocomplete="new-password"
        :placeholder="'请输入' + item.title"
        v-model="item.inputText"
      />

      <el-checkbox-group class="check-box"  v-model="item.inputText" v-else-if="item.inputType == 5">
        <el-checkbox :label="text" v-for="(text,index) in item.dropdownList" :key="index"></el-checkbox>
      </el-checkbox-group>

      <input
        v-else
        class="select-list input"
        type="text"
        :placeholder="'请输入' + item.title"
        v-model="item.inputText"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // style:{
    //   type:Object,
    //   default:()=>{

    //   }
    // }
  },
  data() {
    return {};
  },
  created() {
   
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
.my-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  box-sizing: border-box;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 35px;
    margin: 5px 0;
    box-sizing: border-box;
    font-size: 14px;

    // border: 1px solid red;
    .title {
      flex: 0 0 100px;
      text-align: right;
      margin-right: 30px;
    }

    .select-list {
      // width: 100%;
      // height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      // border: 1px solid #f1f1f1;
    }
  }

  .textarea-item {
    height: 120px;
    align-items: baseline;

    .textarea {
      width: 100%;
      height: 100%;
      // border: 1px solid #f1f1f1;
      outline: none;
      resize: none;
      padding: 5px;
      box-sizing: border-box;
    }
  }

  .check-box{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
}

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
  .my-list {
    // padding-right: 10px;
    .item {
      width: 100%;
      line-height: 45px;

      .title {
        flex: 0 0 100px;
        margin-right: 10px;
      }
    }
  }
}

// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
}
</style>