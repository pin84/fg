/**
 * 添加及使用方法参考core/apis/index.js的说明
 * 
 * typeCheck：
 *      isObject            判断是否为对象类型
 *      isEmptyObject       判断是否为空对象类型
 *      isArray             判断是否为数组类型
 *      isFunction          判断是否为函数类型
 *      isString            判断是否为字符串类型
 *      isNumber            判断是否为数字类型
 *      isBoolean           判断是否为布尔类型
 *      log                 console.log
 *      error               console.error
 *      warn                console.warn
 * 
 * deepClone                深拷贝
 * deepMerge                对象深度合并
 * debounce                 防抖函数
 * throttle                 节流函数
 * dateFormat               日期格式化
 * Validator                表单验证
 */

// let toolsList = [
//     {name: 'typeCheck', path: './typeCheck'},
//     {name: 'deepClone', path: './deepClone'},
//     {name: 'deepMerge', path: './deepMerge'},
//     {name: 'debounce', path: './debounce'},
//     {name: 'throttle', path: './throttle'},
//     {name: 'dateFormat', path: './dateFormat'},
//     {name: 'validator', path: './validator'}
// ]
// // toolsList中需要解构的数据将name放到deconstructList数组里面
// let deconstructList = ['typeCheck']

const typeCheck = require('./typeCheck')
const deepClone = require('./deepClone')
const deepMerge = require('./deepMerge')
const debounce = require('./debounce')
const throttle = require('./throttle')
const dateFormat = require('./dateFormat')
const validator = require('./validator')


// let tools = {}
// toolsList.map(item => {
//     if (deconstructList.includes(item.name)) {
//         tools = {...tools, ...(require(item.path))}
//     } else {
//         tools[item.name] = require(item.path)
//     }
// })


module.exports = {
    ...typeCheck,
    deepClone,
    deepMerge,
    debounce,
    throttle,
    dateFormat,
    validator
}