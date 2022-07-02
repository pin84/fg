const http = require('./http');
const CONFIG = require('./config');

http.interceptors.request.use(function (config) {
    if (!config.url) throw new Error('URL cannot be empty !');

    // 添加公共请求头请添加配置到header，例如：config.header.Authorization = 'xxx'
    // TODO

    let tempConfig = {
        url: ['http://', 'https://'].some(item => config.url.includes(item)) ? config.url : CONFIG[config.urlType || 'BASEURL'] + config.url,
        method: config.method ? config.method.toUpperCase() : 'GET', // 请求方式
        data: config.data || {}, // 请求参数。默认为空
        dataType: config.dataType || "json",
        header: config.header || {}, // 设置请求的 header
        responseType: config.responseType || "text",
        timeout: config.timeout || "", // 超时时间，单位为毫秒 
    };
    console.info(`Start => `, JSON.parse(JSON.stringify(tempConfig)));
    return {...config, ...tempConfig};
}, function (error) {
    console.warn("Request Interceptors => ", error);
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(async function (result) {
    console.info(`Finish => `, JSON.parse(JSON.stringify({ url: result.request.url, ...result.response })));
    // 拆分请求
    let req = result.request;
    // 请求失败
    if (result.type === "fail") {
        console.warn(result.response);
        return Promise.reject(result.response);
    };
    // 拆分响应
    let res = result.response;

    // 兼容多方返回RESPONSE_CODE
    let keyTemp = req.urlType || "default";
    let codeKey = CONFIG.RESPONSE_KRY[keyTemp];
    if (CONFIG.RESPONSE_CODE[keyTemp].includes(res.data[codeKey]) || CONFIG.RESPONSE_CODE[keyTemp].length === 0) {
        return res.data;
    };
    // 登录过期 重新获取token
    if ((res.data || {}).code === 403) {
        // TODO
        console.warn("remove token");
        return Promise.reject(res);
    }
    // 不需要显示showModal时，传入hideModal: true
    !req.hideModal && uni.showModal({
        title: "提示",
        content: res?.data?.error_msg || res?.data?.mesg || res?.data?.msg || res?.data?.message || res?.data?.data || '系统繁忙，请稍后重试！',
        confirmText: "确定",
		confirmColor: "#ec519a",
        showCancel: !1,
    });
    return Promise.reject(res);
}, function (error) {
    console.warn("Response Interceptors => ", error);
    return Promise.reject(error);
});

module.exports = http;