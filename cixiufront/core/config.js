const log = console.log

/**
 * MODE 定义开发环境
 */
const MODE = 'prod'

/**
 * RESPONSE_CODE API 请求的允许通过的code(当请求响应的code不是数组里面的值时，显示提示Modal, 数组为空时不进行拦截)
 */
 const RESPONSE_CODE = {
    default: [0],
    otherUrl: [0],
};
/**
 * RESPONSE_KRY  API 响应码
 */
const RESPONSE_KRY = {
    default: "code",
    otherUrl: "error_code",
};

/**
 * ENV_LIST                     所有可选开发环境(MODE为空的情况下默认使用dev环境)
 * --- ENVNAME                  开发环境名称
 * --- BASEURL                  该环境下面的 API 请求的域名
 */
const ENV_LIST = [
    {
        // 开发环境
        ENVNAME: 'dev',
        BASEURL: `https://data.lzhs.top/`,
		STATICURL: "https://data.lzhs.top/upload/cxData/",
    },
    {
        // 测试环境
        ENVNAME: 'test',
        BASEURL: `https://data.lzhs.top/`,
		STATICURL: "https://data.lzhs.top/upload/cxData/",
    },
    {
        // 生产环境
        ENVNAME: 'prod',
        BASEURL: `https://data.lzhs.top/`,
		STATICURL: "https://data.lzhs.top/upload/cxData/",
    },
]

var CONFIG = ENV_LIST.find(item => item.ENVNAME === MODE) || ENV_LIST[0]
if (!CONFIG.BASEURL) { throw(`请为${CONFIG.envName}环境添加baseUrl`) }
CONFIG.RESPONSE_CODE = RESPONSE_CODE
CONFIG.RESPONSE_KRY = RESPONSE_KRY

log(`Development environment: %c${CONFIG.ENVNAME}`, "color: green")
log(`Interface environment: ${CONFIG.BASEURL}`)

module.exports = CONFIG
