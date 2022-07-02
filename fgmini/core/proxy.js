const info = require('./info') || {}

let handler = {
    get(target, key, receiver) {
        if(!(key in receiver)) {
            console.error(key + "属性不存在，请检查配置。")
        }
        // 懒监听，去获取的时候才监听对象里面的对象，而不是直接递归循环监听
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key, receiver)
    }
}
function useProxy(obj, passList = []) {
    // Proxy 不建议在基础版本库2.4.1以下使用
    // ios 10 以下不支持Proxy
    if (info.basicVersion('2.4.1') < 0 || !Proxy) {
        return obj
    };

    let _temp = {};
    (Object.keys(obj) || []).forEach(item => {
        _temp[item] = passList.includes(item) || typeof obj[item] !== 'object' ? obj[item] : new Proxy(obj[item], handler)
    });
    return _temp;
}

module.exports = useProxy