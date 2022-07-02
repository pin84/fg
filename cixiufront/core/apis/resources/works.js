import http from '@/core/request.js';

const apis = {
    // 添加剧目
    addWork(params) {
        return http({
            url: 'acx/addwork', 
            method: "POST",
            data: params, 
        })
    },
    // 获取工作列表
    getWork(params) {
        return http({
            url: 'acx/getwork', 
            method: "GET",
            data: params, 
        })
    },
    // 获取工作详情
    getWorkById(params) {
        return http({
            url: 'acx/getworkbyid', 
            method: "GET",
            data: params, 
        })
    },
    // 更新剧目
    updateWork(params) {
        return http({
            url: 'acx/updatework', 
            method: "POST",
            data: params, 
        })
    },
    // 删除剧目
    delWork(params) {
        return http({
            url: 'acx/delwork', 
            method: "GET",
            data: params, 
        })
    },
};
module.exports = apis;