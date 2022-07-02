<template>
  <div class="home">
    <div class="login-box">
      <div class="img-box">
        <img src="" alt="" />
      </div>

      <div class="login-right">
        <div class="img-box-2"></div>
        <h2>侗族刺绣大数据管理平台</h2>

        <div class="input-box">
          <i class="iconfont icon-username"></i>
          <input
            class="input"
            placeholder="请输入您的管理员用户名"
            type="text"
            v-model="username"
            @keyup.enter="login"
          />
        </div>
        <div class="input-box">
          <i class="iconfont icon-mima"></i>
          <input
            v-model="password"
            class="input"
            type="password"
            autocomplete="new-password"
            placeholder="请输入您的登录密码"
            @keyup.enter="login"
          />
        </div>
        <el-button ref="btn" class="btn" type="primary" @click="login"
          >登录</el-button
        >
        <!-- <el-button class="btn" type="primary" @click="test">登录</el-button> -->
        <a class="pointer" download  href="/static/202205110040.apk">下载手机App</a>
      </div>
    </div>
    <div class="tip">三江侗族自治县非物质文化遗产保护与发展中心</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { msgbox } from "@/utils/utils.js";
export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  // components: {
  //   HelloWorld,
  // },

  mounted() {
    console.log(this.$refs.btn.$el);
    this.$refs.btn.$el.focus();
  },

  methods: {
    async login() {
      if (!this.username) {
        await msgbox({
          msg: "请输入用户名",
        });
        return;
      }

      let { code, data } = await this.$post(this.$api.login, {
        username: this.username,
        pwd: this.password,
      });

      if (code == -1) {
        await msgbox({
          msg: data,
        });
        return;
      }
      console.log("-user-", data);
      let jurisdictionList  = data.jurisdictionList.split(',')
      if (jurisdictionList.length == 1 && jurisdictionList[0] == 10) {
        await msgbox({
          msg: "该账号没有权限登录后台",
        });
        return;
      }
      
      localStorage.setItem('jurisdiction' , jurisdictionList.join(',') )
      localStorage.setItem('userinfo' , JSON.stringify(data) )

      this.$router.push("/index");
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin wh($w, $h) {
  width: $w;
  height: $h;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin c-img-box($w, $h) {
  @include wh($w, $h);
}
.home {
  @include wh(100vw, 100vh);
  // border: 1px solid red;
  box-sizing: border-box;
  background: url("../assets/images/bg/bg.png") no-repeat;
  background-size: cover;
  // min-width: 1200px;
  @extend .flex;
  flex-direction: column;
  font-size: 14px;
  .login-box {
    @extend .flex;
    background-color: #fff;
    @include wh(80vw, 60vh);
    max-width: 844px;
    // justify-content: space-between;
    box-sizing: border-box;
    .img-box {
      // @include c-img-box(371px, 100%);
      background: url("../assets/images/bg/loginBg.png") no-repeat;
      height: 100%;
      flex: 0 0 44%;
      background-size: cover;
    }
    .login-right {
      @include wh(100%, 100%);
      @extend .flex;
      padding: 0 10px;
      flex-direction: column;
      justify-content: space-around;
      .img-box-2 {
        background: url("../assets/images/bg/logintitle.png") no-repeat center;
        @include c-img-box(77px, 48px);
      }
      .input-box {
        width: 100%;
        @extend .flex;
        position: relative;
        border: 1px solid #222;
        padding: 0 10px;
        box-sizing: border-box;
        .iconfont {
          display: inline-block;
          font-size: 26px;
        }
        .input {
          @include wh(100%, 50px);
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 18px;
          border: none;
          outline: none;
          // border-left: 1px solid red;
        }
      }
      .btn {
        width: 100%;
        height: 50px;
        background-color: #9c2933;
        color: #fff;
        outline: none;
        border: none;
        font-size: 16px;
      }
      .pointer {
        color: #37f;
      }
    }
  }
  .tip {
    line-height: 80px;
  }
}

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
  .home {
    .login-box {
      @include wh(90vw, 40vh);
      .img-box {
        flex: 0 0 371px;
      }
    }
  }
}
// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
  .home {
    .login-box {
      @include wh(80vw, 50vh);
      .img-box {
        display: none;
      }
    }
  }
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
  .home {
    .login-box {
      @include wh(95vw, 50vh);
      .img-box {
        // @include wh(371px, 511px);
        display: none;
      }
    }
  }
}
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
}
</style>