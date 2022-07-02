
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabIndex: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {

      } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: [
      {
        id: 1,
        icon: app.$img.tabbar.home_n,
        icon_selected: app.$img.tabbar.home_a,
        color: '#6e6d6b',
        color_selected: '#e64340',
        name: '首页',
        url: '/pages/index/index',
        navigateType: "switchTab",
      },
      {
        id: 2,
        icon: app.$img.tabbar.designer_n,
        icon_selected: app.$img.tabbar.designer_a,
        color: '#6e6d6b',
        color_selected: '#e64340',
        name: '设计师',
        url: '/pages/designer/designer',
        navigateType: "switchTab",
      },
      {
        id: 3,
        icon: app.$img.tabbar.publish_n,
        icon_selected: app.$img.tabbar.publish_a,
        color: '#6e6d6b',
        color_selected: '#e64340',
        name: '发布',
        url: '/pages/publish/publish',
        navigateType: "switchTab",
        className: "mianTab"
      },
      {
        id: 4,
        icon: app.$img.tabbar.policy_n,
        icon_selected: app.$img.tabbar.policy_a,
        color: '#6e6d6b',
        color_selected: '#e64340',
        name: '乡村振兴',
        url: '/pages/policy/policy',
        navigateType: "switchTab",
      },
      {
        id: 5,
        icon: app.$img.tabbar.mine_n,
        icon_selected: app.$img.tabbar.mine_a,
        color: '#6e6d6b',
        color_selected: '#e64340',
        name: '我的',
        url: '/pages/mine/mine',
        navigateType: "switchTab",
      },
    ], // tabbar,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tabbarClick(e) {
      let target = e.currentTarget.dataset
      let { tabbarList, tabIndex } = this.data
      if (target.index === tabIndex) return false;

      let navigateUrl = tabbarList[target.index].url || "";

      if (navigateUrl) {
        // 跳转webview页面需要返回按钮
        wx[tabbarList[target.index].navigateType]({url:  navigateUrl});
        // tabbar中直接使用navigateTo跳转webview后可使左上角显示返回首页按钮
        // wx.redirectTo({url:  navigateUrl});
      } else {
        wx.showToast({
          title: "页面丢失，请稍后重试。",
          icon: "none"
        });
      }
    },

  }
})
