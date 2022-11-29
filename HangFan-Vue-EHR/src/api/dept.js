import request from "../utils/request.js"

/**
 * 查询
 */
export function getDeptList(data) {
    return request({
        url: "/dept/list",
        method: "get",
        data
    })
}
/**
 * 菜单操作
 */
export async function handleDeptOperate(params) {
    return request({
        url: "/dept/operate",
        method: "post",
        data: params
    })
}

/**
 * 所有用户列表
 */
export function getAllUserList(data) {
    return request({
        url: "/users/all/list",
        method: "get",
        data
    })
}