// index.js
let tokenAndLink = require('../../behaviors/tokenAndLink');

Page({
  data: {
    canIUseGetUserProfile: false,
    userInfo: {}, // 用户信息
    menuInfos: app.$mock.mine.menuInfos || [], // 功能
    showPage: false, // 是否显示页面
  },
  // behaviors
  behaviors: [tokenAndLink],
  // 更新用户信息
  updateInfo(info) {
    this.setData({
      userInfo: info
    });
  },
  // 页面点击事件
  pageClick(e) {
    if (!this.mixin_checkToken(this.userLogin)) return false;
    let target = e.currentTarget.dataset;
    let { userInfo } = this.data;
    switch (target.type) {
      case "nav": // 功能区点击
        this.mixin_handleLink({
          type: target.item.linkType,
          url: target.item.linkAddress,
        });
        break;
      case "designer": // 成为设计师
        if (!userInfo.username || !userInfo.phone) {
          wx.showModal({
            title: '提示',
            content: '使用该功能前需要完善信息',
            showCancel: true,
            confirmText: '确定',
            confirmColor: "#e64340",
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/membership/membership' // 指定页面的url
                });
              }
            }
          });  
          return false;
        };
        this.apiApplyDesigner();
        break;
      default:
        console.warn("未定义事件", e);
        break;
    }
  },
  // 登录相关
  userLogin() {
    
    app.$auth.login().then(res => {
      if (res.userInfo) {
        this.apiCode2Session(res);
      }
    })
  },
  // -------------API-------------
  // 登录
  async apiCode2Session(infos) {
    let [err, res] = await app.$awaitWrap(app.$apis.common.code2Session({code: infos.code }));
    if (err) return false;
    this.apiPutUser(infos, res.data.token);
  },
  // 保存用户信息
  async apiPutUser(infos = {}, token = "") {
    let putParams = {
      token: token
    };
    Object.keys(infos.userInfo).sort().forEach((key) => {
      ![null, undefined, ""].includes(infos.userInfo[key]) && (putParams[key] = infos.userInfo[key]);
    });
    let [err, res] = await app.$awaitWrap(app.$apis.mine.putUser(putParams));
    if (err) return false;
    let tempUserData = {...infos.userInfo, ...res.data};
    wx.setStorageSync('token', token || "");
    wx.setStorageSync('userInfo', tempUserData);
    app.globalData.userInfo = tempUserData;
    this.updateInfo(tempUserData);
  },
  // 获取用户信息
  async apiGetUser() {
    let [err, res] = await app.$awaitWrap(app.$apis.mine.getUser());
    if (err || res.code !== 0) return false;
    let tempUserData = {...app.globalData.userInfo, ...res.data};
    wx.setStorageSync('userInfo', tempUserData);
    app.globalData.userInfo = tempUserData;
    this.updateInfo(tempUserData);
    setTimeout(() => {
      this.setData({
        showPage: true
      });
    }, 100);
  },
  // 申请设计师
  async apiApplyDesigner() {
    let { userInfo } = this.data;
    let [err, res] = await app.$awaitWrap(app.$apis.mine.applyDesigner({
      username: userInfo.username,
      phone: userInfo.phone,
    }));
    if (err) return false;
    wx.showModal({
      title: '提示',
      content: res.data || "网络繁忙请稍后重试",
      showCancel: false,
      confirmText: '确定',
      confirmColor: "#e64340",
      success(res) {}
    });
  },

  onLoad() {
    if (this.mixin_checkToken(() => {})) {
      this.apiGetUser();
    } else {
      setTimeout(() => {
        this.setData({
          showPage: true
        });
      }, 500);
    }
  },
})