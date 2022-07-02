const T = {
    isArray: function isArray(arr) {
        return arr ? Array.isArray(arr) : false
    },
    isFunction: function isFunction(func) {
        return func ? typeof func === 'function' : false
    },
    isObject: function isObject(obj) {
        return obj ? Object.prototype.toString.call(obj) === '[object Object]' : false
    },
    isNull: function isNull(value) {
        return value === null || Object.prototype.toString.call(value) === '[object Null]'
    },
    isUndefined: function isUndefined(value) {
        return typeof value === 'undefined' || Object.prototype.toString.call(value) === '[object Undefined]'
    },
    isString: function isString(value) {
        return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]'
    },
    isNumber: function isNumber(value) {
        return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]'
    },
    isBoolean: function isBoolean(value) {
        return typeof value === 'boolean' || Object.prototype.toString.call(value) === '[object Boolean]'
    },
} 
module.exports = T