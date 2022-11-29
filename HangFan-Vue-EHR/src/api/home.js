import request from "../utils/request.js"

/**
 * 获取待审通知数量
 */
export function getNoticeCount() {
    return request({
        url: "/leave/count",
        method: "get",
    })
}



// 获取用户权限列表
export function getPermissionList(data) {
    return request({
        url: "/users/getPermissionList",
        method: "get",
        data
    })
}