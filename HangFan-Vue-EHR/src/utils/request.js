/**
 * @title  axios 二次封装
 * @author Frank
 * @date 2022-11-15
 */
import axios from 'axios'
import {ElMessage} from 'element-plus'
// 引入路由实例
import router from '../router'
import config from '../config/environmentConfig.js'
import storage from '@/utils/storage.js'

// 错误消息
const TOKEN_INVALID = 'Token认证失败，请重新登陆'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
// 创建axios对象
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 10000,
})

// 请求拦截
service.interceptors.request.use((req) => {
    // JWT
    if (storage.getItem('userInfo') !== undefined) {
        const {token} = storage.getItem('userInfo')
        const headers = req.headers
        if (!headers.Authorization) headers.Authorization = `Bearer ${token}`
    }
    return req
})

// 响应拦截
service.interceptors.response.use((res) => {
    const {code, data, msg} = res.data
    // 状态码判断
    if (code === 200) {
        // 请求成功
        return data
    } else if (code === 500001) {
        // token认证失败
        ElMessage.error(TOKEN_INVALID)
        // 路由跳转到登陆页面
        router.push('/login')
        return Promise.reject(TOKEN_INVALID)
    } else {
        // 网络异常(其他情况）
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

/**
 * 请求核心函数
 * @param options 请求配置
 */
function request(options) {
    // 默认为get
    options.method = options.method || 'get'
    // 无论是get还是post 数据字段均为data
    if (options.method.toLowerCase() === 'get') options.params = options.data
    // 确保生产环境调取线上地址
    if (config.env === 'production') {
        service.defaults.baseURL = config.baseApi
    } else {
        // mock 开关 控制 开发测试环境api地址切换
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request
