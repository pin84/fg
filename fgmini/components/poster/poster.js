import Poster from '../wxa-plugin-canvas/poster/poster';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 生成海报信息
    posterMsg: {
      type: Object,
      value: () => {},
      observer: function (newVal, oldVal) {
        if (newVal) {
          let judgeList = [!!newVal.userName, !!newVal.goodsName, !!newVal.bg, !!newVal.qrCode];
          this.setData({
            posterImg: ""
          }, () => {
            judgeList.every(item => item) && this.onCreatePoster();
          });
        }
      }
    },
  },
  // attached函数 当组件进入页面节点树时触发，可以使用setData，绝大多数初始化工作在这个时机进行
  attached: function () {
    // this.onCreatePoster();
  },

  /**
   * 组件的初始数据
   */
  data: {
    posterConfig: {},
    posterImg: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 阻止冒泡事件
    stopBubble() {
      return false;
    },
    // 异步渲染canvas
    onCreatePoster() {
      let data = this.data
      let conf = {
        width: 594,
        height: 980,
        backgroundColor: '#fff',
        debug: false,
        pixelRatio: 2,
        blocks: [],
        texts: [
          {
            x: 490,
            y: 948,
            with: 152,
            fontSize: 18,
            color: "#222222",
            lineHeight: 26,
            baseLine: "middle",
            textAlign: "center",
            fontWeight: "bold",
            text: "简单更有趣",
          },
          {
            x: 40,
            y: 860,
            with: 200,
            fontSize: 28,
            lineNum: 2,
            color: "#222222",
            lineHeight: 40,
            baseLine: "middle",
            textAlign: "left",
            text: `感谢XXXX， 我收到了XXXXXX`,
          },
          {
            x: 40,
            y: 920,
            with: 250,
            fontSize: 36,
            lineNum: 2,
            color: "#222222",
            lineHeight: 50,
            baseLine: "middle",
            textAlign: "left",
            fontWeight: "bold",
            text: `XXXXXX`,
          }
        ],
        images: [
          {
            width: 594,
            height: 796,
            x: 0,
            y: 0,
            url: data.posterMsg.bg,
          },
          {
            width: 125,
            height: 125,
            x: 428,
            y: 806,
            url: data.posterMsg.qrCode,
          }
        ]
      }
      // 配置数据
      this.setData({ posterConfig: conf }, () => {
        Poster.create(true, this);
      });
    },
    // 海报生成成功
    onPosterSuccess(e) {
      const { detail } = e;
      this.setData({
        posterImg: detail
      });
    },
    onPosterFail(err) {
      console.error(err);
      setTimeout(() => {
        wx.showToast({
          title: '生成海报出错了，请稍后重试',
          icon: 'none',
          duration: 3000
        });
      }, 500);
    },
    pageClick(e) {
      let target = e.currentTarget.dataset;
      switch (target.type) {
        case "close": // 关闭弹窗
          this.setData({
            posterImg: ""
          });
          break;
        case "showImg": // 显示图片
          wx.previewImage({
            current: this.data.posterImg,
            urls: [this.data.posterImg]
          });
          break;
        case "longtap": // 长按
          let scopeTemp = 'scope.writePhotosAlbum';
          app.$auth.checkAuthorize(scopeTemp).then(res => {
            // console.log(res);
            !res.setting && console.info(res);
            if (!res.hasScope) {
              return app.$auth.authorize(scopeTemp);
            } else {
              return {
                hasScope: true,
                setting: null,
              };
            }
          }).then (res => {
            // console.log(res);
            if (res.hasScope) {
              wx.saveImageToPhotosAlbum({
                filePath: this.data.posterImg,
                success(res) { 
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })
                },
                fail(err) {
                  console.warn('saveImageToPhotosAlbum fail:', err);
                }
              })
            }
          })
          break;
      }
    }
  }
})
