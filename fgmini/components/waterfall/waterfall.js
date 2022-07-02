
let originalData = [];
let spliceData = [];
let handleLenght = 0;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 渲染数组
     */
    list: {
      type: Array,
      value: () => ([]),
      observer: function (n, o) {
        // 定义开始截取的索引
        let initSpliceLength = originalData.length;
        // 储存全部数据
        originalData = app.$tools.deepClone(n);
        // 截取需要显示的数据
        spliceData = originalData.slice(initSpliceLength);
        // 执行渲染处理
        spliceData.length && this._handleData();
      }
    },
    /**
     * 相关配置
     */
    options: {
      type: Object,
      value: () => ({}),
      observer: function (n, o) {
        this.setData({
          comOptions: {
            ...this.data.comOptions, 
            ...n,
          },
        })
      },
    }
  },
  attached: function() {
    // 初始化瀑布流列数、命名及高度
    this._initShowList();
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
    originalData = [];
  },
  /**
   * 组件的初始数据
   */
  data: {
    comOptions: {
      idKey: "id", // 默认id字段
      imgKey: "img", // 默认图片显示字段
      titleKey: "title", // 默认标题字段
      tagsKey: "tagsList", // 默认标签列表字段
      tagsNameKey: "name", // 默认标签名字段
      errorImg: app.$img.common.errorImg, // 错误图片显示
    }, // 默认配置
    showList: [], // 瀑布流数据列
    fillList: [], // 预渲染列表
    comShow: false,
    lineStyle: "50%"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化瀑布流列数、命名及高度
    _initShowList() {
      let ntemp = ["left", "right"];
      let initList = [];
      ntemp.forEach(item => {
        initList.push({
          list: [],
          height: 0,
          mark: item,
        })
      });
      this.setData({
        showList: initList,
        lineStyle: `${100 / initList.length}%;`
      })
    },
    // 处理渲染列表
    _handleData() {
      if (spliceData.length === 0) return false;
      wx.showLoading({
        title: '图片加载中', // 内容
      });
      handleLenght = 0;
      this.setData({
        fillList: spliceData
      });
    },
    // 获取节点高度
    _computeCardHeight(type) {
      return new Promise((resolve, reject) => {
        let query = this.createSelectorQuery();
        query.select(`#${type}`).boundingClientRect(res => {
          resolve({...res})
        })
        query.exec()
      })
    },
    // 图片加载完成
    _imgLoad(e) {
      let target = e.currentTarget.dataset;
      this._computeCardHeight(target.mark).then(res => {
        let handleIndex = spliceData.findIndex(item => item.id === target.id);
        handleIndex !== -1 && (spliceData[handleIndex]._height = parseInt(res.height))
        handleLenght++;
        handleLenght === spliceData.length && this._handleView();
      });
    },
    // 图片加载错误
    _imgError(e) {
      let target = e.currentTarget.dataset;
      let { fillList } = this.data;
      let handleIndex = fillList.findIndex(item => item.id === target.id);
      let upKey = `fillList[${handleIndex}].${this.data.comOptions.imgKey}`;
      spliceData[handleIndex][this.data.comOptions.imgKey] = this.data.comOptions.errorImg;
      this.setData({
        [upKey]: this.data.comOptions.errorImg,
      });
    },
    // 点击事件
    _waterfallClick(e) {
      let target = e.currentTarget.dataset;
      this.triggerEvent('callback', {
        model: "raiders",
        data: target.item || {}
      });
    },
    // 处理渲染数据
    _handleView() {
      let tempList = app.$tools.deepClone(this.data.showList);
      spliceData.forEach(item => {
        let heightTemp = tempList.map(item => item.height || 0);
        let minNum = Math.min(...heightTemp);
        let minIndex = heightTemp.indexOf(minNum);
        tempList[minIndex].height += (item._height || 0);
        tempList[minIndex].list.push(item);
      });
      spliceData = [];
      this.setData({
        fillList: [],
        showList: tempList,
        comShow: true
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 300);
    },
  }
})
