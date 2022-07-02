const http = require('../request.js')
const apis = {
  /**
   * 注册设计师
   * @param {Object} params 
   * @param {String} params.phone 手机号码
   * @param {String} params.username 用户名
   * @returns 
   */
  applyDesigner(params) {
    return http({
      url: '/fg/apply/designer',
      data: params,
      method: "POST",
      loading: true,
      loadingText: "申请中..."
    })
  },
  /**
   * 用户信息
   * @param {Object} params 
   * @returns 
   */
  getUser(params) {
    return http({
      url: '/fg/getuser',
      data: params,
      method: "GET"
    })
  },
  /**
   * 用户信息
   * @param {Object} params 
   * @param {String} params.phone 手机号码
   * @param {String} params.username 用户姓名
   * @returns 
   */
  putUser(params) {
    return http({
      url: '/fg/updateUser',
      data: params,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
  },
}
module.exports = apis;