<template>
  <div class="login-form">
    <van-form
      validate-first
      @failed="onFailed"
      @submit="onSubmit"
      autocomplete="off"
    >
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        autocomplete="off"
        v-model="info.username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[
          {
            validator: validatorUsername,
            message: '用户名长度必须大于等于4个字符',
          },
        ]"
      />
      <van-field
        autocomplete="off"
        v-model="info.email"
        label="邮箱"
        name="validator"
        placeholder="请输入邮箱"
        :rules="[{ validator:validatorEmail, message: '请输入正确内容' }]"
      />

      <van-field
        autocomplete="off"
        v-model="info.pwd"
        label="密码"
        name="validator"
        placeholder="请输入密码"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />

      <van-field
        autocomplete="off"
        v-model="info.phone"
        label="手机号码"
        name="validator"
        placeholder="请输入手机号码"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      info: { username: "", pwd: "", email: "", phone: "" },
      value3: "",
      pattern: /\d{6}/,
    };
  },

  methods: {
    onSubmit() {
      console.log("aa");
    },

    validatorEmail(val){
      let  reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

      console.log();
    },

    validatorUsername(val) {
      let flag = val.length > 3;
      return flag;
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      console.log(val);
      return /1\d{3}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");
        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>


<style lang="scss" scoped>
.login-form {
  // border: 1px solid red;
}
</style>