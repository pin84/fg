/**
 * 时间格式化
 * @param {String} fmt 定义时间格式
 * @param {*} timestamp 传入时间戳
 */
function dateFormat(timestamp, fmt = 'yyyy-MM-dd') {
    if (!timestamp) timestamp = Number(new Date())
    if (timestamp.toString().length === 10) timestamp *= 1000
    let date = new Date(timestamp)

    let ret;

    const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    const opt = {
        "y+": date.getFullYear().toString(),                      // 年
        "M+": formatNumber((date.getMonth() + 1)).toString(),     // 月
        "d+": formatNumber(date.getDate()).toString(),            // 日
        "H+": formatNumber(date.getHours()).toString(),           // 时
        "m+": formatNumber(date.getMinutes()).toString(),         // 分
        "s+": formatNumber(date.getSeconds()).toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], opt[k])
        };
    };
    return fmt;
}

module.exports = dateFormat