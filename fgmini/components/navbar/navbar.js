Component({
  // multipleSlots 为组件开启多插槽模式
  externalClasses: ['nav-class'],
  options: {
    multipleSlots: true,
  },

  // properties 组件用来储存外部数据
  properties: {
    // 返回按钮显示的文字
    backText: {
      type: String,
      observer: function (newVal, oldVal) {}
    },
    // 导航标题
    title: {
      type: String,
      observer: function (newVal, oldVal) {
      }
    },
    // 是否使用自定义导航
    isCustomize: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {}
    },
    // 是否使用占位节点
    showPlaceholder: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {}
    },
    // 背景图片
    bgImg: {
      type: String,
      observer: function (newVal, oldVal) {}
    }
  },

  // 组件用来储存内部私有数据
  data: {
    
  },

  // attached函数 当组件进入页面节点树时触发，可以使用setData，绝大多数初始化工作在这个时机进行
  attached: function () {
    let systemInfo = app.$info.navbar();
    const pages = getCurrentPages();
    let ctx = pages[pages.length - 1];
    // systemInfo.showHome = !systemInfo.showBack && !app.globalData.tabsList[0].url.includes(ctx.__route__);
    systemInfo.showHome = !systemInfo.showBack && app.globalData.tabsList.findIndex(item => item.url.includes(ctx.__route__)) === -1;
    this.setData(systemInfo);
    this.triggerEvent('callback', {
      model: "navbar",
      data: {...systemInfo}
    });
  },

  // methods对象 定义组件内的各种方法
  methods: {
    // 返回按钮
    _navback() {
      if (this.data.showHome && !this.data.showBack) {
        wx.reLaunch({ url: '/pages/index/index' });
        return false;
      }
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  }
})