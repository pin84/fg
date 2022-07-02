## 关于components

### 富文本插件：Parser 

[Parser](https://github.com/jin-yufeng/Parser)


### 关于WeUI 

[WeUI](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)

```
    目前使用useExtendedLib 扩展库方式引入组件
    相关配置请参考https://developers.weixin.qq.com/miniprogram/dev/extended/weui/quickstart.html
    
    使用页面json引入：
    "usingComponents": {
        "mp-toptips": "/miniprogram_npm/weui-miniprogram/toptips/toptips"
    }
    wxml页面使用：
    <mp-toptips msg="{{error}}" type="error" show="{{error}}"></mp-toptips>

    js相关参考官网示例

```

## 关于海报生成（关联poster组件）

[wxa-plugin-canvas](https://github.com/jasondu/wxa-plugin-canvas)

```
使用wxa-plugin-canvas海报生成组件，相关配置参考github
```

### tabbar 自定义底部
```
    // HACK   改组件有待优化
```

### navbar 自定义顶部
```
    使用页面json引入：
    "usingComponents": {
        "navbar": "/components/navbar/navbar"
    }
    wxml页面使用：
    <navbar title="首页"></navbar>
    具体参数可查看组件js中定义的properties
    如需其他操作，可自行修改、添加参数

```

### waterfall 瀑布流组件

json
```
"usingComponents": {
    "waterfall": "/components/waterfall/waterfall"
}
```

js
```
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waterfallList: [], // 列表数据
    waterfallOptions: {}, // 配置
    pageMsg: {
      pageSize: 10,
      pageNum: 1
    }
  },
  // 组件回调事件
  handleCallback(e) {
    let compTarget = e.detail;
    let compData = e.detail.data;
    switch (compTarget.model) {
      case "waterfall": // 瀑布流组件
        console.log("Waterfall Click ", compData);
        break;
    }
  },
  // 获取列表数据
  getData() {
    app.$http({
      url: 'https://www.fastmock.site/mock/f056c68ee1850806a3dc38ae1c6cb917/api/waterfall',
      method: "GET",
      data: this.data.pageMsg
    }).then(res => {
      // res.data[2].img = ""; // 模拟数据为空
      // res.data[8].img = "111"; // 模拟图片渲染错误
      let result = res.data || [];
      result.map(item => {
        item.title = `P${this.data.pageMsg.pageNum}-${item.title}`;
      });
      this.setData({
        waterfallList: [...this.data.waterfallList, ...result],
      });
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      [`pageMsg.pageNum`]: this.data.pageMsg.pageNum + 1,
    })
    this.getData();
  },
})
```

wxml
```
<waterfall list="{{waterfallList}}" options="{{waterfallOptions}}" bindcallback="handleCallback"></waterfall>
```


