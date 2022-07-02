// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      /**
       * 渲染数组
       */
      tabsList: {
        type: Array,
        value: () => ([]),
        observer: function (n, o) { }
      },
      /**
       * 选中项
       */
      tabsIndex: {
        type: Number,
        value: 0,
        observer: function (n, o) { }
      },
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      comClick(e) {
        let target = e.currentTarget.dataset;
        this.triggerEvent('callback', {
          model: "tabs",
          data: {
            index: target.index
          }
        });
      }
    }
  })
  