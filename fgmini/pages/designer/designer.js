// pages/designer/designer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        designerList: []
    },
    pageClick(e) {
        let target = e.currentTarget.dataset;
        let {id} = target.item
        wx.setStorageSync('designer', JSON.stringify(target.item))
        wx.navigateTo({
            // url: '/pages/designerDetail/designerDetail',
            url: `/pages/caseAnalysis/caseAnalysis?id=${id}&isFromDesigner=1`,
        });
    },

    // 获取设计师列表
    async apiGetDesignerList() {
        let [err, res] = await app.$awaitWrap(app.$apis.home.getDesignerList());
        if (err) return false;
        this.setData({
            designerList: res.data || []
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.apiGetDesignerList();
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
        console.log("onReachBottom")
    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {

    // }
})