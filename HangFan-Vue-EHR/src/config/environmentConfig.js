/**
 * 环境配置
 */
const env = import.meta.env.MODE || "production"
const envConfig = {
    dev: {
        baseApi: "/api",
        mockApi: "/mock"
    },
    production: {
        baseApi: "/mock",
    }
}


export default {
    env,
    namespace: "HangFanEHR",
    mock: false,
    ...envConfig[env],
}