Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
  },
  // 表单操作
  formOperate(e) {
    let target = e.target.dataset;
    let tempData = {};
    tempData[`userInfo.${target.type}`] = e.detail.value || "";
    this.setData(tempData);
  },
  // 页面点击事件
  pageClick() {
    app.$tools.debounce(() => {
      let { userInfo } = this.data;
      let validator = new app.$tools.validator();
      validator.check(userInfo.username, [
        { strategy: "isEmpty", errMsg: "真实姓名不能为空" },
        { strategy: "isName", errMsg: "请输入正确的姓名" },
      ]);
      validator.check(userInfo.phone, [
        { strategy: "isEmpty", errMsg: "手机号码不能为空" },
        { strategy: "isPhone", errMsg: "请输入正确的手机号码" },
      ]);
      let errMsg = validator.checkResult();
      if (errMsg) {
        wx.showToast({
          title: errMsg, // 内容
          icon: "none",
          duration: 2000,
          mask: false,
        });
        return false;
      };
      this.apiPutUserName();
    }, 500);
  },
  // -----------------API--------------
  // 提交修改
  async apiPutUserName() {
    let { userInfo } = this.data;
    let putParams = {
      username: userInfo.username,
      phone: userInfo.phone,
    };
    let [err, res] = await app.$awaitWrap(app.$apis.mine.putUser(putParams));
    if (err) return false;
    wx.showToast({
      title: "更新成功", // 内容
      icon: "success",
      duration: 2000,
      mask: true,
    });
    let tempUserData = {...userInfo, ...res.data};
    wx.setStorageSync('userInfo', tempUserData);
    app.globalData.userInfo = tempUserData;
    this.$invoke("pages/mine/mine", "updateInfo", tempUserData);
    setTimeout(() => {
      wx.navigateBack();
    }, 1900);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})