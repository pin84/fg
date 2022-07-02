function handleLink() {
    switch (app.globalData.participate.from) {
        default:
          wx.reLaunch({ url: '/pages/index/index' });
          break;
      }
};
module.exports = handleLink
  