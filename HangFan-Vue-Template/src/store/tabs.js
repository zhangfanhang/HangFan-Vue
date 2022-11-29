/**
 * 路由tab信息
 */

import {defineStore, acceptHMRUpdate} from "pinia"

// 第一个参数是应用程序中 store 的唯一 id
export const useTabsStore = defineStore("tabs", {
    state: () => {
        return {
            tabs: [],
            currentTab: '',
        }
    },
    actions: {
        clearTabs(){
          this.tabs=[]
        },
        changeTab(tab) {
            this.currentTab = tab
        },
        //保存
        saveTab(tab) {
            const uniqueFunc = (arr, uniId) => {
                const res = new Map()
                return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1))
            }
            if (tab.path !== '/login') this.tabs.push(tab)
            this.tabs = uniqueFunc(this.tabs, 'path')
        },
        //  删除
        removeTab(tabPath) {
            this.tabs.forEach((item, index) => {
                if (tabPath === item.path) {
                    this.tabs.splice(index, 1)
                }
            })
        }
    }
})
// 热更新支持
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTabsStore, import.meta.hot))
}