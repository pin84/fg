// pages/home/home.js
const filrUpload = require('../../utils/fileUpload');
let tokenAndLink = require('../../behaviors/tokenAndLink');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temImgList: [],
    tempMediaList: [],
    userInfo: {}, // 用户信息
    formData: {
      username: "", // 姓名
      phone: "", // 电话
      content: "", // 要求
      address: "", // 地址
    }, // 填写的表单信息
    addressRegion: ['广东省', '广州市', '海珠区'], // 选择的省市区
  },
  behaviors: [tokenAndLink],
  // 表单操作
  formOperate(e) {
    let target = e.target.dataset;
    let tempData = {};
    tempData[`formData.${target.type}`] = e.detail.value || "";
    this.setData(tempData);
  },
  // 地址选择
  bindRegionChange(e) {
    this.setData({
      addressRegion: e.detail.value
    })
  },

  // 提交前数据处理
  orderCheck() {
    if (!this.mixin_checkToken()) return false;
    app.$tools.debounce(() => {
      let { formData, addressRegion, temImgList } = this.data;
      let validator = new app.$tools.validator();
      validator.check(temImgList.length, [
        { strategy: "isCustomize", errMsg: "请先选择照片", judge: !!temImgList.length },
      ]);
      validator.check(formData.content, [
        { strategy: "isEmpty", errMsg: "建设内容不能为空" },
      ]);
      validator.check(formData.username, [
        { strategy: "isEmpty", errMsg: "联系人姓名不能为空" },
        { strategy: "isName", errMsg: "请输入正确的姓名" },
      ]);
      validator.check(formData.phone, [
        { strategy: "isEmpty", errMsg: "手机号码不能为空" },
        { strategy: "isPhone", errMsg: "请输入正确的手机号码" },
      ]);
      validator.check(formData.address, [
        { strategy: "isEmpty", errMsg: "详细地址不能为空" },
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
      this.orderSubmit();
    }, 500);
  },
  // 提交订单
  orderSubmit() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let { formData, addressRegion, temImgList } = this.data;
    let files = temImgList;
    let tempMediaList = [];
    this.apiUploadImg(files).then(imgRes => {
      imgRes.forEach((item, index) => {
        let tempData = JSON.parse(item.data || JSON.stringify({}));
        tempMediaList.push({
          ...files[index],
          url: tempData.data || ""
        });
      });
      let submitData = {
        urlList: tempMediaList.map(item => {
          return item.url
        }).toString(),
        remark: formData.content,
        phone: formData.phone,
        username: formData.username,
        addr: `${addressRegion.toString()},${formData.address}`,
        status: 1
      };
      // return submitData;
      return app.$apis.orders.addOrder(submitData);
    }).then(orderRes => {
      wx.hideLoading();
      wx.showToast({
        icon: "success",
        title: '提交成功',
      });
      this.setData({
        temImgList: [],
        tempMediaList: [],
        formData: {
          content: "", // 要求
          address: "", // 地址
        }, // 填写的表单信息
      })
    }).catch(err => {
      console.warn(err);
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '服务器繁忙，请稍后重试！',
        showCancel: false,
      })
    })
  },
  // 图片上传
  apiUploadImg(files = []) {
    let uploadsList = [];
    files.forEach(obj => {
      uploadsList.push(filrUpload(app.$CONFIG.uploadUrl, obj.tempFilePath));
    });
    return Promise.all(uploadsList);

    Promise.all(uploadsList).then(res => {
      let tempMediaList = [];
      res.forEach((item, index) => {
        let tempData = JSON.parse(item.data || JSON.stringify({}));
        tempMediaList.push({
          ...files[index],
          url: tempData.data || ""
        });
      });
      this.setData({
        temImgList: [],
        tempMediaList: tempMediaList
      });
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '上传成功',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false,
      })
    })
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
    // this.initData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.mixin_checkToken()) return false;
    let tempUserInfo = wx.getStorageSync('userInfo') || {};
    if (!tempUserInfo.username || !tempUserInfo.phone) {
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
    this.setData({
      userInfo: tempUserInfo,
      'formData.phone': tempUserInfo.phone,
      'formData.username': tempUserInfo.username,
    });

  },

  deleteMedia(e) {
    let index = e.currentTarget.dataset.index
    let temImgList = this.data.temImgList
    temImgList.splice(index, 1)
    this.setData({
      temImgList
    });
  },

  async chooseMedia() {
    let temImgList = this.data.temImgList
    if (temImgList.length > 8) return
    let restLen = 9 - temImgList.length
    wx.chooseMedia({
      count: restLen,
      mediaType: ['mix'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      sizeType: 'compressed',
      success: (res) => {
        let {
          tempFiles
        } = res
        tempFiles.forEach(item => {
          temImgList.push(item)
        })
        this.setData({
          temImgList
        });
      },

      complete: (e) => {
        // console.log(e);
      }
    })
  },

  previewMedia(e) {

    let {
      tempFilePath,
      fileType,
    } = e.currentTarget.dataset.item
    wx.previewMedia({
      sources: [{
        url: tempFilePath,
        type: fileType
      }],
      success: (res) => {
        // console.log(res);
      },
      fail: (err) => {
        // console.log(err);
      },
      complete: (e) => {
        // console.log(e);
      }

    })

  },

  fileUpload(uploadURL, filePath, ts) {
    return new Promise((reslove, reject) => {
      wx.uploadFile({
        url: uploadURL,
        filePath,
        name: 'fileName',
        formData: {
          'ts': ts
        },
        success: reslove,
        fail: reject,
      })
    })
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