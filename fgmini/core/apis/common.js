const http = require('../request.js')

// api  common模块
const common = {
    /**
     * 静默登录
     * @param {Object} params 
     * @param {String} params.code code
     * @returns 
     */
    // login(params) {
    //     return http({
    //         url: '/member/weChatMiniApp/wxLogin',
    //         method: 'POST',
    //         data: params, 
    //         loading: false,
    //     })
    // },
    /**
     * 授权登录
     * @param {Object} params 
     * @param {String} params.code wx.login => code
     * @param {String} params.encryptedData wx.getUserProfile => encryptedData
     * @param {String} params.iv wx.getUserProfile => iv
     * @param {Object} params.userInfo wx.getUserProfile => userInfo
     * @returns 
     */
    // authLogin(params) {
    //     return http({
    //         url: '/member/weChatMiniApp/wxAuth',
    //         method: 'POST',
    //         data: params, 
    //         loading: true,
    //         loadingText: "登录中..."
    //     })
    // }, 
    /**
     * 获取手机号
     * @param {String} params.code wx.login => code
     * @param {String} params.encryptedData button => getPhoneNumber => encryptedData
     * @param {String} params.iv button => getPhoneNumber => iv
     * @returns 
     */
    // phoneLogin(params) {
    //     return http({
    //         url: '/member/weChatMiniApp/wxPhone',
    //         method: 'POST',
    //         data: params, 
    //         loading: true,
    //     })
    // },

    /**
     * 上传图片
     * @param {*} params 
     * @returns 
     */
    phoneLogin(params) {
        return http({
            url: '/fg/update',
            method: 'POST',
            data: params,
            loading: true,
        })
    },
    /**
     * 短信
     * @param {Object} params 
     * @param {String} params.phone 手机号码
     * @returns 
     */
    postSms(params) {
        return http({
            url: '/fg/sms',
            data: params,
            method: "GET"
        })
    },
    /**
     * code2Session
     * @param {Object} params 
     * @param {String} params.code code
     * @returns 
     */
     code2Session(params) {
        return http({
            url: '/mini/code2Session',
            data: params,
            method: "GET"
        })
    },

}

module.exports = common;