import request from "../utils/request.js"

/**
 * 角色列表
 */
export async function getRoleList(params) {
    return request({
        url: "/roles/list",
        method: "get",
        data: params
    })
}

/**
 * 角色创建/编辑/删除
 */
export async function handleRoleOperate(params) {
    return request({
        url: "/roles/operate",
        method: "post",
        data: params
    })
}

/**
 *
 */
export async function updatePremisson(params) {
    return request({
        url: "/roles/update/permission",
        method: "post",
        data: params
    })
}