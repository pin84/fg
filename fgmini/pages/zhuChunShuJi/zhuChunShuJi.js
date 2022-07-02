// pages/zhuChunShuJi/zhuChunShuJi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerInfos: [], // 轮播图
    personInfo:{},
    articleList:[]
  },

  toDetail(e) {
    let item = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', item)
      }
    })
  },


  async apiGetBannerList() {
    let {code,data} = await app.$apis.home.getBannerList({
      type: 2
    })
    if (code == -1) return 
    this.setData({
      bannerInfos: data 
    });
  },


  async getArticleList(){
    let {code,data} = await app.$apis.home.getArticleList({page: 1, num: 2,type:5})
    if(code == -1){
      return
    }
    this.setData({
      personInfo:data[0]
    })
  },
  async getArticleList_2(){
    let {code,data} = await app.$apis.home.getArticleList({page: 1, num: 20,type:6})
    if(code == -1){
      return
    }

    for(let obj of data){
      obj.create_time = obj.create_time.split('T')[0]
    }
    this.setData({
      articleList:data
    })

    console.log('--------',data);
  },

  changeSwiper(e) {
    let upkey = e.currentTarget.dataset.key || "swiperDot";
    this.data[upkey] !== e.detail.current && this.setData({
      [upkey]: e.detail.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.apiGetBannerList()
    this.getArticleList()
    this.getArticleList_2()
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