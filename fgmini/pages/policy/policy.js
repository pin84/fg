// pages/zhengche/zhengche.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: [{
        name: '国家政策',
        list: []
      },
      {
        name: '特色文化传承',
        list: []
      },
      {
        name: '乡村振兴案例',
        list: []
      },

    ],
    topListIndex: null,
    allData: [],
    curDataList: []
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
        // let list = this.data.allData.filter(item => item.type == (idx + 1))

        // console.log(this.data.allData, list);


        let list =await this.getData(idx + 1)

        this.setData({
          curDataList: list
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

  async getData(type = 1) {
    let {
      code,
      data
    } = await app.$apis.home.getArticleList({
      page: 1,
      num: 999,
      type
    })

    return data

    // this.setData({
    //   allData: data
    // })

    // let obj = {
    //   detail: {
    //     data: {
    //       index: 0
    //     },
    //     model: "tabs"
    //   }
    // }
    // this.comCallback(obj)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let obj = {
      detail: {
        data: {
          index: 0
        },
        model: "tabs"
      }
    }
    this.comCallback(obj)


    return
    let cultureArticle = [];
    let caseArticle = [];
    let policyArticle = [];

    for (let obj of data) {
      obj.subTitle = obj.content.slice(0, 30);
      switch (obj.type) {
        case 1:

          break;

        default:

          caseArticle.push(obj);
          break;
      }
    }


    this.setData({
      [`topList[0].list`]: article,
      [`topList[1].list`]: cultureArticle,
      [`topList[2].list`]: caseArticle
    })
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