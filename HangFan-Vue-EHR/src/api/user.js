import request from "../utils/request.js"

/**
 * 用户列表
 */
export async function getUserList(params) {
    return request({
        url: "/users/list",
        method: "get",
        data: params
    })
}

/**
 * 删除用户
 */
export async function deleteUser(params) {
    return request({
        url: "/users/delete",
        method: "post",
        data: params
    })
}

/**
 * 部门列表
 */
export function getDeptList() {
    return request({
        url: "/dept/list",
        method: "get"
    })
}

/**
 * 角色列表
 */
export function getRoleAllList() {
    return request({
        url: "/roles/allList",
        method: "get",
    })
}

/**
 * 用户操作（编辑、新增）
 */
export async function handleUserOperate(params) {
    return request({
        url: "/users/operate",
        method: "post",
        data: params
    })
}