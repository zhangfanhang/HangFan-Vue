/**
 * 用户信息存储
 */

import { defineStore, acceptHMRUpdate } from 'pinia'
import storage from '../utils/storage.js'

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: storage.getItem('userInfo') || {},
    }
  },
  actions: {
    //保存用户信息
    saveUserInfo(userInfo) {
      this.userInfo = userInfo
      storage.setItem('userInfo', userInfo)
    },
  },
})
// 热更新支持
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
