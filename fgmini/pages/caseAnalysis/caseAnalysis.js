// pages/zhengche/zhengche.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: [{
        name: '乡村规划',
        list: []
      },
      {
        name: '人居',
        list: []
      },
      {
        name: '家装',
        list: []
      },

    ],
    topListIndex: null,
    allData: [],
    curDataList: [],
    designer:{},
    isFromDesigner:false,
    userid:0
  },
  async comCallback(e) {
    let target = e.detail.data || {};
    switch (e.detail.model) {
      case "tabs": // tabs点击
        let idx = target.index
        if (idx == this.data.topListIndex) return
        this.setData({
          topListIndex: idx,
        })


        let list = await this.getData(idx+1)
        let handlerList = []
        let curuserid = this.data.userid
        if(curuserid){
          handlerList = list.filter(item=>item.userid == curuserid)
        } else {
          handlerList = list
        }

        this.setData({
          curDataList: handlerList
        })

        break;
      default:
        break;
    }
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

  async getData(casetype = 1) {
    let {
      code,
      data
    } = await app.$apis.home.getArticleList({
      page: 1,
      num: 999,
      type:4,
      casetype
    })

    for(let obj of data){
      obj.create_time = obj.create_time.split('T')[0]
    }

    return data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {id,isFromDesigner} = options

    let designer = wx.getStorageSync('designer')
    if(designer){
      this.setData({
        designer: JSON.parse(designer)
      })
    }
    this.setData({
      isFromDesigner,
      userid:id
    })

    let obj = {
      detail: {
        data: {
          index: 0
        },
        model: "tabs"
      }
    }
    this.comCallback(obj)
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})