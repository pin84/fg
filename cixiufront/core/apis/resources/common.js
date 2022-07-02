import http from '@/core/request.js'

const common = {
    /**
     * 上传文件
     * @param {Object} params 
     * @param {file} params.fileName
     * @returns {Object}
     */
    uploadFile(params) {
        return http({
            url: 'acx/uploadfile', 
            method: "POST",
            data: params, 
        })
    },
    // 获取页面信息
    getPageCount(params) {
        return http({
            url: 'acx/getpagecount', 
            method: "GET",
            data: params, 
        })
    },
	// 获取页面信息
	getCategoryList(params) {
	    return http({
	        url: 'acx/getconfig', 
	        method: "GET",
	        data: params, 
	    })
	},
	// 登录
	userLogin(params) {
	    return http({
	        url: 'acx/login', 
	        method: "POST",
	        data: params, 
	    })
	},
    // // get请求
    // testGet(params) {
    //     return http({
    //         url: 'api/wx/sayhello', 
    //         method: "get",
    //         data: params, 
    //     })
    // },
    // // post请求
    // testPost(params) {
    //     return http({
    //         url: 'api/wx/usepost', 
    //         data: params, 
    //         method: 'post',
    //         header: {'content-type': 'application/x-www-form-urlencoded'}
    //     })
    // }
};
module.exports = common;