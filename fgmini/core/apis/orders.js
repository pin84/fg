const http = require('../request.js')
const apis = {
  /**
   * 添加订单
   * @param {Object} params 
   * @param {String} params.token 
   * @param {String} params.urlList 
   * @param {String} params.remark 
   * @param {String} params.phone 
   * @param {String} params.username 
   * @param {String} params.addr 
   * @param {Number} params.status 
   * @returns 
   */
  addOrder(params) {
    return http({
      url: '/fg/addorder',
      data: params,
      method: "POST",
      loading: false,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
  },
  /**
   * 修改订单
   * @param {Object} params 
   * @param {String} params.id 
   * @param {String} params.token 
   * @param {String} params.urlList 
   * @param {String} params.remark 
   * @param {String} params.phone 
   * @param {String} params.username 
   * @param {String} params.addr 
   * @param {Number} params.status 
   * @returns 
   */
  updataOrder(params) {
    return http({
      url: '/fg/updataorder',
      data: params,
      method: "POST",
      loading: true,
      loadingText: "正在提交"
    })
  },
  /**
   * 获取订单列表
   * @param {Object} params 
   * @param {Object} params.token
   * @param {Object} params.pageIndex
   * @param {Object} params.pageSize
   * @returns 
   */
  getOrderList(params) {
    return http({
      url: '/fg/getorderlist',
      data: params,
      method: "GET"
    })
  },
  /**
   * 删除订单
   * @param {Object} params 
   * @param {String} params.token 
   * @param {String} params.id  
   * @returns 
   */
  delOrder(params) {
    return http({
      url: '/fg/delorder',
      data: params,
      method: "GET",
    })
  },
  /**
   * 订单详情
   * @param {Object} params 
   * @param {String} params.token 
   * @param {String} params.id  
   * @returns 
   */
  getOrderDetails(params) {
    return http({
      url: '/fg/getorder',
      data: params,
      method: "GET",
    })
  },
}
module.exports = apis;