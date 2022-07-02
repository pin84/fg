const MD5 = require("./md5.min.js");
const BASE64 = require("./base64.min.js");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 格式化手机号码
 * @param {*} tel 
 * @returns 
 */
const formatTel = (tel) => {
  var reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, "$1****$2");
}
/**
 * 对象 根据 key 排序
 * @param {Object} obj 传入对象
 * @returns {Object}
 */
const sortObject = obj => {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') return {};
  const ordered = {};
  Object.keys(obj).sort().forEach((key) => {
    ordered[key] = obj[key];
  });
  return ordered;
}
/**
 * 计算时间差
 * @param {*} sDate1 yyyy/MM/dd 
 * @param {*} sDate2 yyyy/MM/dd 
 * @returns {Object}
 */
const dateDifference = (sDate1, sDate2) => {
  let start = new Date(sDate1.replace(/-/g, "/"));
  let end = new Date(sDate2.replace(/-/g, "/"));
  let startDate = new Date(start).getTime(); // 开始时间
  let endDate = new Date(end).getTime(); // 结束时间
  let dateCha = endDate - startDate;
  //计算出相差天数
  let days = Math.floor(dateCha / (24 * 3600 * 1000));
  //计算出小时数
  let leave1 = dateCha % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); // 分
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000); // 秒
  // console.log(`${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`);
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}


/**
 * 获取加密信息
 * @param {String} openID openID
 * @param {Object} extra 额外的参数
 * @returns {Object}  返回请求参数及签名
 */
const getSign = (openID = "", extra = {}) => {
  if (!openID) throw new Error('openID cannot be empty !');
  // 混合参数
  let tempObj = {
    ...extra,
    authTime: new Date().getTime(),
    authKey: BASE64.encode(openID),
  };
  // 测试环境下添加__debug
  // if (app?.$CONFIG?.envName !== "prod") {
  //   tempObj.__debug = 1;
  // };
  // 用于跳转第三方h5链接时需要携带的参数
  let newObj = {};
  // MD5 secret
  let md5Secret = "agk#w$adjdad3dgfuo";
  // 签名用的字符串
  let tempString = "";
  Object.keys(tempObj).sort().forEach((key) => {
    // 处理新的参数
    newObj[key] = tempObj[key];
    // 处理签名用的字符串
    tempString += `${key}${tempObj[key]}`;
  });
  // 获取签名
  newObj.authSign = MD5(`${md5Secret}${tempString}${md5Secret}`).toString().toUpperCase();
  // 请求参数处理
  let tempArray = [];
  Object.keys(newObj).sort().forEach((key) => {
    tempArray.push(`${key}=${newObj[key]}`);
  });
  // console.log(`${md5Secret}${tempString}${md5Secret}`, newObj, tempArray.join("&"));
  return {
    data: newObj,
    query: tempArray.join("&") || "",
  };
}
/**
 * 获取url上的参数
 * @param {String} url URL链接
 * @returns {Object} 参数对象
 */
const parseQuery = (url = "") => {
  if (!url) throw new Error('url cannot be empty !');
  let tempQueryObj = {};
  let tempQueryString = url.split("?")[1] || "";
  tempQueryString && tempQueryString.split("&").forEach(item => {
    let tempKey = item.split("=")[0] || "";
    let tempValue = new RegExp(`${tempKey}=([^&$]+)`).exec(item)[1] || "";
    tempKey && (tempQueryObj[tempKey] = tempValue);
  });
  return tempQueryObj;
}
/**
 * 解码路线导航Polyline
 */
const decodingPolyline = (coors = []) => {
  for (let i = 2; i < coors.length; i++) {
    coors[i] = coors[i - 2] + coors[i] / 1000000;
  };
  let newArr = [];
  for (let i = 0; i < coors.length; i += 2) {
    let tempItem = coors.slice(i, i + 2);
    newArr.push({
      longitude: tempItem[1],
      latitude: tempItem[0],
    });
  };
  return newArr;
}


module.exports = {
  sortObject,
  formatTime,
  formatTel,
  dateDifference,
  getSign,
  parseQuery,
  decodingPolyline,
}
