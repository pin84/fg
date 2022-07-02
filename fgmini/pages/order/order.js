// pages/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topList: [
      { name: '我的订单', list: [], pageMsg: {
        pageSize: 10,
        pageNumber: 0,
        isOwn: 1, // 1： 查询自己的 2： 查询所有
        hasNextPage: true, // 是否有下一页
      } },
      { name: '全部订单', list: [], pageMsg: {
        pageSize: 10,
        pageNumber: 0,
        isOwn: 2, // 1： 查询自己的 2： 查询所有
        hasNextPage: true, // 是否有下一页
      } },
    ],
    topListIndex: 0,
  },
  comCallback(e) {
    let target = e.detail.data || {};
    let { topList, topListIndex } = this.data;
    switch (e.detail.model) {
      case 'tabs': // tabs点击
        target.index !== this.data.topListIndex &&
          this.setData({
            topListIndex: target.index,
          });
          if (!topList[target.index].list.length) {
            this.apiGetList();
          };
        break
      default:
        break
    }
  },
  pageClick(e) {
    let {id} = e.currentTarget.dataset.order
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${id}`,
    })
  },
  // 获取列表
  async apiGetList() {
    let { topList, topListIndex } = this.data;
    let [err, res] = await app.$awaitWrap(app.$apis.orders.getOrderList({
      pageIndex: topList[topListIndex]?.pageMsg?.pageNumber,
      pageSize: topList[topListIndex]?.pageMsg.pageSize,
      isOwn: topList[topListIndex]?.pageMsg.isOwn,
    }));
    if (err) return false;
    let upNextKey = `topList[${topListIndex}].pageMsg.hasNextPage`;
    let upListKey = `topList[${topListIndex}].list`;

    (res.data || []).map(item => {
      item._showImgList = (item.urlList || '').split(",");
      item._showTime = item.create_time.slice(0, 10);
    });
    let tempList = topList[topListIndex]?.pageMsg?.pageSize !== 0 ? [...(topList[topListIndex]?.list || []), ...(res.data || [])] : res.data || []
    this.setData({
      [upNextKey]: res.data.length === topList[topListIndex]?.pageMsg?.pageSize,
      [upListKey]: tempList
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.apiGetList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { topList, topListIndex } = this.data;
    if (!topList[topListIndex]?.pageMsg?.hasNextPage) return false;
    let upNumberKey = `topList[${topListIndex}].pageMsg.pageNumber`;
    this.setData({
      [upNumberKey]: topList[topListIndex]?.pageMsg?.pageNumber + 1
    });
    this.apiGetList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
