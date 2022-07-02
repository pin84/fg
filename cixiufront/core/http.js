class InterceptorsManage {
    constructor() {
        this.handlers = [];
    };
    use(fullfield, rejected) {
        this.handlers.push({
            fullfield,
            rejected
        });
    };
};
class Http {
    constructor() {
        this.interceptors = {
            request: new InterceptorsManage,
            response: new InterceptorsManage
        };
    };
    request(config) {
        config = {
            url: "",
            method: "GET", // OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
            data: {}, // 请求参数。默认为空
            dataType: "json", // 返回的数据格式 => JSON，返回后会对返回的数据进行一次 JSON.parse
            header: {}, // 设置请求的 header，header 中不能设置 Referer。`content-type` 默认为 `application/json`
            responseType: "text", // 1.7.0   text	响应的数据为文本;   arraybuffer	响应的数据为 ArrayBuffer
            timeout: "", // 超时时间，单位为毫秒 2.10.0
            ...config
        }
        // 拦截器和请求组装队列
        let chain = [this.send.bind(this), undefined] // 成对出现的，失败回调暂时不处理
        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fullfield, interceptor.rejected);
        });
        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fullfield, interceptor.rejected);
        });
        // 执行队列，每次执行一对，并给promise赋最新的值
        let promise = Promise.resolve(config);
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift());
        };
        return promise;
    };
    send(config) {
        return new Promise(resolve => {
            let instance = uni.request({
                url: config.url,
                method: config.method.toUpperCase(), // OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
                data: config.data || {}, // 请求参数。默认为空
                dataType: config.dataType || "json", // 返回的数据格式 => JSON，返回后会对返回的数据进行一次 JSON.parse
                header: config.header || {}, // 设置请求的 header，header 中不能设置 Referer。`content-type` 默认为 `application/json`
                responseType: config.responseType || "text", //   text	响应的数据为文本;   arraybuffer	响应的数据为 ArrayBuffer
                timeout: config.timeout || 60000, // 超时时间，单位为毫秒 
                success: (res) => {
                    resolve({
                        request: config,
                        response: res,
                        type: "success"
                    });
                },
                fail: (error) => {
                    resolve({
                        request: config,
                        response: error,
                        type: "fail"
                    })
                },
                complete: (response) => {
                    if (200 !== response.statusCode && response.errMsg !== "request:fail abort") {
                        uni.showModal && uni.showModal({
                            title: "Internal Server Error",
                            content: response.data ? response.data.error_msg || response.data.mesg || response.data.msg || response.data.errmsg || '系统错误，请稍后重试！' : response.errMsg || '系统错误，请稍后重试！',
                            confirmText: "确定",
                            showCancel: !1
                        });
                    };
                },
            });
            config.cancel && config.cancel(instance);
        });
    };

};
// 工具方法，实现b的方法混入a;
const utils = {
    extend(a, b, context) {
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }
        }
    }
}

// 最终导出axios的方法-》即实例的request方法
function CreateAxiosFn() {
    let http = new Http();
    let req = http.request.bind(http);
    // 混入属性，处理axios的request方法，使之拥有axios实例上的所有属性
    utils.extend(req, http);
    return req;
};

module.exports = CreateAxiosFn();