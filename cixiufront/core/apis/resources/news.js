import http from '@/core/request.js';

const apis = {
    // 添加剧目
    addPlay(params) {
        return http({
            url: 'acx/addplay', 
            method: "POST",
            data: params, 
        })
    },
    // 获取剧目列表
    getPlay(params) {
        return http({
            url: 'acx/getplay', 
            method: "GET",
            data: params, 
        })
    },
    // 获取传承人详情
    getPlayById(params) {
        return http({
            url: 'acx/getplaybyid', 
            method: "GET",
            data: params, 
        })
    },
    // 更新剧目
    updatePlay(params) {
        return http({
            url: 'acx/updateplay', 
            method: "POST",
            data: params, 
        })
    },
    // 删除剧目
    delPlay(params) {
        return http({
            url: 'acx/delplay', 
            method: "GET",
            data: params, 
        })
    },
};
module.exports = apis;