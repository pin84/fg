## 关于core使用
### 目录结构

```
api                       存放API请求模块
create                    创建mixins、invoke、compose相关
tools                     工具类函数
auth.js                   用户校验，登录，code，权限相关
config.js                 项目常用变量   用于修改项目接口访问地址等
createFn.js               挂载全局app、nwx（Promise化 wx API，示例看详情）
img.js                    图片管理
index.js                  收集core可用变量及函数
info.js                   获取小程序相关信息（系统信息，更新信息等）
page.js                   重写用于构建页面的Page函数
proxy.js                  index.js中代理函数[暂时用于调用未定义的core/*方法时给予提示]
request.js                API请求函数
```

### 使用方式

**1、使用API模块**

*app.js引入模块*
```app.js

    // 使用请求API模块，引入core/index
    const ALL = require('./core/index')

    App({
        onLaunch: function () {},
        globalData: {},
        $api: ALL.api
    })

```

*小程序页面使用API*
```index.js

    Page({
        data: {},
        onLoad: function () {
            /**
             * app.js引入模块后，可在页面通过getApp().$api获取相关的API模块（其中$api为app.js里面定义的名称）
             * 该请求示例使用了API里面的test模块的"testGet"API
             */
            getApp().$api.test.testGet({name: 'Re'}).then(res => {
                console.log('请求结果=========>', res)
            })
        }
    }
    
```

**2、使用其他**

*app.js引入模块*
```app.js

    ...
    // 使用基础配置、相关方法引入core/index
    const ALL = require('./core/index')

    App({
        onLaunch: function () {
            // 检测是否有新的小程序版本
            ALL.info.version()
        },

        ...

        $CONFIG: ALL.CONFIG, // 项目常用变量
        $http: ALL.http, // 请求方法，可单独使用

        ...

    })

```

*小程序页面使用*
```index.js

    Page({
        data: {},
        onLoad: function () {
            /**
             * app.js引入模块后，页面使用其他与使用API相关内容类似
             * 请求API定义时使用'http://'或者'https://'开头不会使用config.js里面定义的baseUrl拼接url
             * 单独使用请求方法时，如果使用完整的url请求，则不会使用config.js里面定义的baseUrl拼接url
             */
            getApp().$http({
                url: 'http://localhost:3004/api/wx/sayhello', 
                data: {name: 'SINGLE'}
            }).then(res => {
                console.log('请求结果:', res)
            })
            console.log(getApp().$CONFIG)
        }
    }
    
```

**3、关于mixins（混入、已弃用，请使用behaviors）、invoke(跨页面通讯)的使用**
*app.js引入模块*

page.js中重写Page的函数已为页面定义了图片管理的字段，无修改情况下，可在页面直接使用__img字段的图片管理，页面data无需重新定义
如果修改了相关配置，则在page.js重写函数里面修改相关内容；
可在page.js重写函数里定义页面共用的方法或data的内容；
其他比较常用的可定义为mixins；

```app.js
const ALL = require('./core/index')
App({
  onLaunch: function () {
    ALL.initPage({useMixins: true}) // 重写Page函数 useMixins 传入true即使用mixins、invoke
  },

  ......

  // 页面栈
  $pagesStack: new ALL.pagesStack(),
})

```

*小程序页面使用*
```index.js(详情参考demo页面)
import counter from '../../mixins/counter'
Page({
  data: {
    ...
  },
  mixins: [counter],
  onLoad: function () {
    // invoke + dateFormat
    this.$invoke('pages/demo/demo', 'selfInvoke', 'DEMO', app.$tools.dateFormat('yyyy-MM-dd HH:mm:ss', new Date().getTime()))
  },
  // Invoke Demo
  selfInvoke(name, time) {
    console.log(`Invoke Demo. name=${name}, time=${time}`)
  },
})

```

**4、createFn.js**

如有使用createFn.js将可在所有页面直接使用app、nwx（Promise化 wx API）

nwx => 将在方法中传入对象时生效
ex: 
    nwx.showToast({
        title: 'title',
    }).then(res => {
        console.log(res) // {errMsg: "showToast:ok"}
    })
nwx => 传入非对象或者不传
    nwx.canIUse('getUserInfo') // true
    nwx.showLoading()

app => 将不需要在页面定义const app = getApp()即可使用
    app.globalData.isFullScreen
    ...

**5、新增其他工具函数建议放在utils => util.js或utils文件夹下新增js文件，页面单独引入使用**


