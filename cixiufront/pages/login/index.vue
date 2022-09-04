<template>
  <view class="container">
    <image :src="img.login.bg" class="loginBg"></image>
    <view class="titleBox flex f_a_center f_j_center">
      <image :src="img.login.logo" class="titleLogo"></image>
      <text class="titleName">自治区级非物质文化遗产</text>
    </view>
    <view class="appBox flex f_c f_a_center f_j_center">
      <image :src="img.login.applLogo" class="appLogo"></image>
      <text class="appName">三江侗绣大数据平台</text>
    </view>
    <view class="formBox">
      <view class="formLine flex f_a_center f_j_between">
        <text class="formName">用户名</text>
        <input
          type="text"
          v-model="editForm.username"
          class="formInput"
          placeholder="请输入用户名"
          placeholder-class="formPlaceholder"
        />
      </view>
      <view class="formLine flex f_a_center f_j_between">
        <text class="formName">密码</text>
        <input
          type="text"
          v-model="editForm.password"
          :password="true"
          class="formInput"
          placeholder="请输入密码"
          placeholder-class="formPlaceholder"
        />
      </view>
      <view class="formBtn flex f_a_center f_j_center" @click="handleSubmit"
        >登录</view
      >
      <view class="formTips" @click="handlePass">游客登录</view>
    </view>
    <view class="tipsBox">
			<view>三江侗族自治县文化馆</view>
			<view>（ 三江侗族自治县非物质文化遗产保护与发展中心 ）</view>
			<view>柳州城市职业学院</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      img: this.$img,
      editForm: {
        username: "",
        password: "",
      },
    };
  },
  onLoad() {},
  onShow() {},
  methods: {
    handleSubmit() {
      if (!this.editForm.username)
        return uni.showToast({
          title: "请输入用户名",
          duration: 2000,
          icon: "none",
        });
      if (!this.editForm.password)
        return uni.showToast({
          title: "请输入密码",
          duration: 2000,
          icon: "none",
        });
      this.$apis.common
        .userLogin({
          username: this.editForm.username,
          pwd: this.editForm.password,
        })
        .then((res) => {
          uni.setStorageSync("i_userinfo", res.data);
          getApp().changeTabbars(Boolean(res.data));
          uni.reLaunch({
            url: "/pages/index/index",
          });
        });
    },
    handlePass() {
      uni.removeStorageSync("i_userinfo");
      getApp().changeTabbars(false);
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  // padding: 168rpx 0 0;
  overflow: hidden;
//   border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  background-color: #000;
  .loginBg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    opacity: 0.8;
    filter: blur(12px);
    z-index: 0;
    transform: scale(1.2);
  }
  .titleBox {
    width: 100vw;
    // position: absolute;
    margin-top: 100rpx;
    z-index: 1;
    .titleLogo {
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
    }
    .titleName {
      font-size: 28rpx;
      padding-left: 16rpx;
      font-weight: bold;
      color: $uni-text-color-inverse;
      letter-spacing: 1rpx;
    }
  }
  .appBox {
    width: 100vw;
    // position: absolute;
    z-index: 1;
    margin: 40rpx 0 100rpx 0;
    .appLogo {
      width: 188rpx;
      height: 188rpx;
      border-radius: 50%;
      margin-bottom: 24rpx;
    }
    .appName {
      font-size: 40rpx;
      font-weight: bold;
      color: white;
    }
  }
  .formBox {
    width: 100vw;
    // position: absolute;
    // top: 55%;
    // left: 0;
    // transform: translateY(-50%);
    z-index: 1;
    .formLine {
      width: 686rpx;
      margin: 0 auto;
      padding: 0 24rpx;
      line-height: 98rpx;
      border-bottom: 2rpx solid $themeColor;
      .formName {
        font-size: 32rpx;
        font-weight: bold;
        color: $uni-text-color-inverse;
        width: 130rpx;
      }
      .formInput {
        font-size: 32rpx;
        color: $uni-text-color-inverse;
        flex: 1;
        height: 100%;
        padding-left: 16rpx;
      }
      ::v-deep .formPlaceholder {
        color: #e0e0e0;
      }
    }
    .formBtn {
      width: 686rpx;
      height: 98rpx;
      border-radius: 8rpx;
      font-size: 36rpx;
      color: $uni-text-color-inverse;
      margin: 68rpx auto 20rpx;
      background: $themeColor;
      &:active {
        opacity: 0.7;
        transform: translateY(3rpx);
      }
    }
    .formTips {
      font-size: 28rpx;
      color: $uni-text-color-inverse;
      margin: 24rpx auto 0;
      width: 100%;
      text-align: center;
    }
  }
  .tipsBox {
    font-size: 24rpx;
    color: $uni-text-color-inverse;
    position: absolute;
    bottom: 98rpx;
    width: 100vw;
    text-align: center;
    line-height: 42rpx;
  }
}
</style>
