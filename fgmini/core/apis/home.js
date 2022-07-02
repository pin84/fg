const http = require('../request.js')
const apis = {
  /**
   * 设计师列表
   * @param {Object} params 
   * @returns 
   */
  getDesignerList(params) {
    return http({
      url: '/fg/getDesigner',
      data: params,
      method: "GET",
      // loading: false
    })
  },
  /**
   * 文章列表
   * @param {Object} params 
   * @returns 
   */
  getArticleList(params) {
    return http({
      url: '/fg/getArticle',
      data: params,
      method: "GET",
      // loading: false
    })
  },
  /**
   * 获取轮播图
   * @param {Object} params 
   * @returns 
   */
   getBannerList(params) {
    return http({
      url: '/fg/getbannerlist',
      data: params,
      method: "GET",
    })
  },
}
module.exports = apis;