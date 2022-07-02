// pages/complaint/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    complaintList: [
      { img: "", name: "客服一", phone: "13535353535" },
      { img: "", name: "客服二", phone: "13535353536" },
    ], // 热线
  },
  pageClick(e) {
    const { type, phone, url } = e.currentTarget.dataset
    switch (type) {
      case 'telephone':
        if(!phone) {
          wx.showToast({
            title: '电话不能为空',
            icon:'none'
          })
          return
        }
        wx.makePhoneCall({
          phoneNumber: phone,
        })
        break;
      case 'copy':
        if(!url) {
          wx.showToast({
            title: '内容为空',
            icon:' none'
          })
        }
        wx.setClipboardData({
          data: url,
          fail: (err) => { console.warn(err) }
        })
        break;
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})