import request from "../utils/request.js"

/**
 * 获取菜单列表
 */
export function getMenuList(data) {
    return request({
        url: "/menu/list",
        method: "get",
        data
    })
}

/**
 * 菜单操作
 */
export async function handleMenuOperate(params) {
    return request({
        url: "/menu/operate",
        method: "post",
        data: params
    })
}