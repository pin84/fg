const http = require('./http');
const CONFIG = require('./config');

// 请求拦截器
http.interceptors.request.use(function (config) {
    if (!config.url) throw new Error('URL cannot be empty !');

    // 添加公共请求头请添加配置到header，例如：con.header.Authorization = 'xxx'
    // 非第三方接口加上Authorization
    // !config.urlType && wx.getStorageSync('token') && (config.header.Authorization = `Bearer ${wx.getStorageSync('token')}`);

    let tempConfig = {
        url: ['http://', 'https://'].some(item => config.url.includes(item)) ? config.url : CONFIG[config.urlType || 'baseUrl'] + config.url,
        method: config.method ? config.method.toUpperCase() : 'GET', // 请求方式
        data: config.data || {}, // 请求参数。默认为空
        dataType: config.dataType || "json",
        header: config.header || {}, // 设置请求的 header
        responseType: config.responseType || "text", // 1.7.0   text	响应的数据为文本;   arraybuffer	响应的数据为 ArrayBuffer
        timeout: config.timeout || "", // 超时时间，单位为毫秒 2.10.0
    };
    // TOKEN
    !config.urlType && wx.getStorageSync('token') && (tempConfig.data.token = `${wx.getStorageSync('token')}`);
    // loading 默认开启
    config.loading = typeof config.loading === "boolean" ? config.loading : true;
    if (config.loading) {
        let allHttpList = app.$tools.deepClone(app?.$NMap?.get("HTTPLIST")) || [];
        allHttpList.length === 0 && wx.showLoading({ title: config.loadingText || '加载中...', mask: true });
        // 请求列表
        allHttpList.push({
            url: tempConfig.url,
            status: "pending", // finish
        });
        app?.$NMap?.set("HTTPLIST", allHttpList);
    };
    console.info(`Start => `, JSON.parse(JSON.stringify(tempConfig)));
    return {...config, ...tempConfig};
}, function (error) {
    console.error("Request Interceptors => ", error);
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(async function (result) {
    console.info(`Finish => `, JSON.parse(JSON.stringify({ url: result.request.url, ...result.response })));
    // 拆分请求
    let req = result.request;
    // 处理loading
    if (req.loading) {
        let allHttpList = app.$tools.deepClone(app?.$NMap?.get("HTTPLIST")) || [];
        let fnIndex = allHttpList.findIndex(item => item.url === req.url && item.status === "pending");
        if (fnIndex !== -1) {
            allHttpList[fnIndex].status = "finish";
            app?.$NMap?.set("HTTPLIST", allHttpList);
        }
        if (allHttpList.every(item => item.status === "finish")) {
            await new Promise(resolve => {
                setTimeout(() => {
                    wx.hideLoading();
                    app?.$NMap?.set("HTTPLIST", []);
                    resolve(true);
                }, 500);
            });
        };
    };
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
    if (res.data?.code === -3) {
        // 移除缓存
        wx.removeStorageSync('token');
        // TODO
        console.warn("remove token");
        // 重新获取token信息
        app.$tools.debounce(() => {
            const tpage = getCurrentPages();
            const thisPage = tpage[tpage.length - 1];
            app.handleLoginByCode().then(res => {
                // 重新登录后会执行页面函数
                thisPage.onLoad(thisPage.options || {});
                thisPage.onReady();
                thisPage.onShow();
            });
        }, 10000, true);
        return Promise.reject(res.data);
    }
    // 不需要显示showModal时，传入hideModal: true
    !req.hideModal && wx.showModal({
        title: "提示",
        content: res.data ? res.data.error_msg || res.data.mesg || res.data.msg || res.data.message || res.data.errmsg || res.data.data || '系统繁忙，请稍后重试！' : '系统繁忙，请稍后重试！',
        confirmText: "确定",
        showCancel: !1,
    });
    return Promise.reject(res);
}, function (error) {
    console.error("Response Interceptors => ", error);
    return Promise.reject(error);
});

module.exports = http;