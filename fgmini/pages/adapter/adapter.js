// pages/adapter/adapter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    showPopup: false,
  },
  // 页面点击事件
  pageClick(e) {
    let target = e.currentTarget.dataset;
    if (target.type !== "toPay") return false;
    let tempQueryList = [];
    let passQuery = ["from", "ydmapAppId"];
    Object.keys(app.globalData.participate).sort().forEach((key) => {
      !passQuery.includes(key) && tempQueryList.push(`${key}=${app.globalData.participate[key]}`);
    });
    let path = `/pages/pay/index?${tempQueryList.join("&") || ""}`;
    // console.log(`
    // wx.navigateToMiniProgram({
    //   appId: ${app.globalData.participate.ydmapAppId},
    //   path: ${path},
    //   envVersion: 'trial',
    // });`)
    wx.navigateToMiniProgram({
      appId: app.globalData.participate.ydmapAppId,
      path,
      envVersion: 'trial',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options = {}) {
    let tempParticipate = {};
    Object.keys(options).forEach(item => {
      tempParticipate[item] = options[item];
      console.info(`Set Global Data =====> ${[item]}: ${options[item]}`);
    });
    app.globalData.participate = tempParticipate;
    console.info('Global Data Now: ', app.globalData.participate);
    // 支付相关逻辑
    if (tempParticipate.from === "toPay") {
      this.setData({ showPopup: true });
      return false;
    }
    setTimeout(() => {
      app.$link();
    }, 1500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})