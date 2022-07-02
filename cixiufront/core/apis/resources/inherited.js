import http from '@/core/request.js';

const apis = {
    // 添加传承人
    addUser(params) {
        return http({
            url: 'acx/adduser', 
            method: "POST",
            data: params, 
        })
    },
    // 获取传承人列表
    getUser(params) {
        return http({
            url: 'acx/getuser', 
            method: "GET",
            data: params, 
        })
    },
    // 获取传承人详情
    getUserById(params) {
        return http({
            url: 'acx/getuserbyid', 
            method: "GET",
            data: params, 
        })
    },
    // 更新传承人
    updateUser(params) {
        return http({
            url: 'acx/updateuser', 
            method: "POST",
            data: params, 
        })
    },
    // 删除传承人
    deleteUser(params) {
        return http({
            url: 'acx/deleteuser', 
            method: "GET",
            data: params, 
        })
    },
};
module.exports = apis;