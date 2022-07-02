const check = require('./typeCheck')
/**
 * 节流函数
 * @param {Function} fn 需要执行的回调
 * @param {Number} time 延时时间
 */
let throttlingFlag = false

function Throttle(fn, time = 500) {
    if (!check.isNumber(time) || !check.isFunction(fn)) {
        throw new Error('Type Error!!!')
    }
    if (!throttlingFlag) {
        throttlingFlag = true
        typeof fn === 'function' && fn()
        setTimeout(() => {
            throttlingFlag = false
        }, time)
    }
}

module.exports = Throttle