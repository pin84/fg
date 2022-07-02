/**
 * 新增API模块需要在apiList添加相关项目
 * 例如新增home模块:
 *      1、当前目录下新增home.js，home.js参考已有API模块
 * 
 *      2、apiList中添加{name: 'home', path: './home'}      
 *         (页面调用与apiList中添加的项目的name相关)
 * 
 *      3、页面调用：app.$api.home.xxx()then().catch()      
 *         (app => getApp(); $api => app.js中引用API模块时定义的值; home => apiList中添加的项目的name ; xxx => home模块中定义的api值)
 * 
 * [第三方接口需要声明urlType，urlType值可以参考config.js => RESPONSE_KRY]
 */
// let apiList = [
//     {name: 'common', path: './common'},
//     {name: 'home', path: './home'},
//     {name: 'mine', path: './mine'},
// ]

// let api = {}
// apiList.map(item => {
//     api[item.name] = require(item.path)
// })

const common = require('./common')
const home = require('./home')
const mine = require('./mine')
const orders = require('./orders')

module.exports = {
    common,
    home,
    mine,
    orders
}