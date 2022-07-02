## 关于测试APPID

```
使用测试APPID可能会导致weui（app.json => useExtendedLib => weui）报错，所以使用测试APPID请先删除weui扩展
```

## 关于页面less文件使用

[vscode](https://blog.csdn.net/weixin_44218060/article/details/103904095)
[HbuilderX](https://doc.weixin.qq.com/txdoc/word?docid=w2_AFIAbgbSAOg7kOqBd0fTxenqYuqYp&scode=AB0AKAeCAAs4EiUhNrAFIAbgbSAOg&type=0&sid=AFJKRQBueWoG0jBNAOhKRgAA)

```
其他开发工具搜索相关less生成wxss教程
注意：
    如果less文件之间存在引用关系，修改被引用文件后，发现引用文件并未修改
    例如pages/index/index.less [引用文件] 引用了 /assets/style/common.less [被引用文件] 
    修改/assets/style/common.less后pages/index/index.less编译的wxss没有变化的情况

处理方法：
    需要在引用文件处重新编译才会起效果
    或者可以通过less.js脚本重新编译该项目下less文件[node ./less.js]
    编译前，确保已安装less  [lessc -v 检查less版本 没有安装less可先全局安装less (npm install -g less)]
    部分配置可查看less.js，例如需要忽略的文件夹，是否需要压缩。
    
```


```
[分包资源文件放置各自分包中的assets文件夹中]
[主包页面不可访问分包资源文件；分包页面可以使用主包资源文件（即根目录下assets文件夹里面的内容）但不可以使用其他分包的资源文件]
[请注意分包根路径的指定，指定不当会导致分包部分内容被打包到主包，占用主包大小]
pages                   => 小程序主包
```

## base64工具

[base64-utf8](https://github.com/vilien/base64-utf8)

## MD5
[js-MD5](https://github.com/emn178/js-md5)

## WEUI
[WEUI](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/)

```
使用WEUI可以在app.json添加（使用扩展库引入）
"useExtendedLib": {
    "weui": true
},
其他配置
```

## 关于本地设置

小程序配置中使用了动态引用，所以请勿开启“上传时进行代码保护”功能
[详情可参考](https://developers.weixin.qq.com/miniprogram/dev/devtools/project.html#%E6%9C%AC%E5%9C%B0%E8%AE%BE%E7%BD%AE)

## 运行打包配置

配置文件为core\config.js
需调整地方：1、_MODE， 2、_ENV

```js

/**
 * _MODE 定义开发环境，体验生产环境请按如下配置
 */
// 自动适配使用该设置
// const _MODE = SYSTEM_ENV[_system.accountInfo().envVersion || 'release']

// 指定环境使用该设置
const _MODE = "prod"

// 请按对应环境修改下面配置
/**
 * _ENV    所有可选开发环境
 * --- envName                  开发环境名称
 * --- baseUrl                  该环境下面的 API 请求的域名
 */
const _ENV = [
    {
        // 开发环境
        envName: 'dev',
        baseUrl: `http://192.168.1.154:8081`,
    },
    {
        // 测试环境
        envName: 'test',
        baseUrl: `https://www.xier.team`,
    },
    {
        // 生产环境
        envName: 'prod',
        baseUrl: `https://www.xier.team`,
    },
]


```
