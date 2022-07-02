const system = require('./info');
const log = console.log;

/**
 * wx.getAccountInfoSync
 * 获取当前帐号信息
 */
const SYSTEM_ENV = {
    develop: 'dev', // 开发版
    trial: 'test', // 体验版
    release: 'prod', // 正式版
}
/**
 * MODE 定义开发环境
 */

let MODE = SYSTEM_ENV[system.accountInfo().envVersion || 'release']
    MODE = "prod" // TEST
/**
 * RESPONSE_CODE API 请求的允许通过的code(当请求响应的code不是数组里面的值时，显示提示Modal, 数组为空时不进行拦截)
 */
const RESPONSE_CODE = {
    /**
     * 200 success
     * 204 查无此用户
     */
    // default: [200, 204],
    default: [0],
    otherUrl: [], // 第三方接口允许响应值
};
/**
 * RESPONSE_KRY  API 响应码
 */
const RESPONSE_KRY = {
    default: "code",
    otherUrl: "error_code", // 第三方接口响应码字段
};
/**
 * ENV    所有可选开发环境
 * --- envName                  开发环境名称
 * --- baseUrl                  该环境下面的 API 请求的域名
 * --- webviewUrl               该环境下面的 webview 域名[主要用于tabbar跳转ydmap]
 */
const ENV = [
    {
        // 开发环境
        envName: 'dev',
        baseUrl: `https://4212225c65.oicp.vip`,
        uploadUrl: `https://4212225c65.oicp.vip/mini/upload`,
        webviewUrl: ``,
    },
    {
        // 测试环境
        envName: 'test',
        baseUrl: `https://data.lzhs.top`,
        uploadUrl: `https://data.lzhs.top/mini/upload`,
        webviewUrl: ``,
    },
    {
        // 生产环境
        envName: 'prod',
        baseUrl: `https://data.lzhs.top`,
        uploadUrl: `https://data.lzhs.top/mini/upload`,
        webviewUrl: ``,
    }
]

var CONFIG = ENV.find(item => item.envName === MODE) || ENV[0]


if (!CONFIG.baseUrl) { throw(`请为${CONFIG.envName}环境添加baseUrl`) }
CONFIG.RESPONSE_CODE = RESPONSE_CODE
CONFIG.RESPONSE_KRY = RESPONSE_KRY

log(`Development environment: %c${MODE}`, "color: green")
log(`Interface environment: ${CONFIG.baseUrl}`)

module.exports = CONFIG
