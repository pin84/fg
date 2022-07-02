let COMMONFN = {
    /**
     * isObject
     * @param {*} obj Any
     * @return {Boolean} 
     */
    isObject: function isObject(obj) {
        return obj && Object.prototype.toString.call(obj) === '[object Object]'
    },
    /**
     * isEmptyObject
     * @param {*} obj Any
     * @return {Boolean} 
     */
    isEmptyObject: function isEmptyObject(obj) {
        return this.isObject(obj) && !Object.keys(obj).length
    },
    /**
     * isArray
     * @param {*} arr Any
     * @return {Boolean} 
     */
    isArray: function isArray(arr) {
        return arr && Array.isArray(arr)
    },
    /**
     * isFunction
     * @param {*} fn Any
     * @return {Boolean} 
     */
    isFunction: function isFunction(fn) {
        return fn && typeof fn === 'function'
    },
    /**
     * isString
     * @param {*} value Any
     * @return {Boolean} 
     */
    isString: function isString(value) {
        return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]'
    },
    /**
     * isNumber
     * @param {*} value Any
     * @return {Boolean} 
     */
    isNumber: function isNumber(value) {
        return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]'
    },
    /**
     * isBoolean
     * @param {*} value Any
     * @return {Boolean} 
     */
    isBoolean: function isBoolean(value) {
        return typeof value === 'boolean' || Object.prototype.toString.call(value) === '[object Boolean]'
    },
    /**
     * isBoolean
     * @param {*} value Any
     * @return {Boolean} 
     */
    isNull: function isNull(value) {
        return value === null
    },
    log: console.log,
    error: console.error,
    warn: console.warn,
}
module.exports = COMMONFN