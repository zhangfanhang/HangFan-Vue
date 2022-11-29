import request from "../utils/request.js"

/**
 * 登陆接口
 */
export async function login(params) {
    return request({
        url: "/users/login",
        method: "post",
        data: params
    })
}

