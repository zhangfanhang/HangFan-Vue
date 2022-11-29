/**
 * storage类封装
 */
import config from '../config/environmentConfig.js'

export default {
  // 获取storage下项目命名空间的值
  getStorage() {
    return JSON.parse(localStorage.getItem(config.namespace) || '{}')
  },
  // 设置数据
  setItem(key, value) {
    const storage = this.getStorage()
    storage[key] = value
    localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  // 获取数据
  getItem(key) {
    return this.getStorage()[key]
  },
  // 删除数据
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  // 清空所有数据
  clearAll() {
    localStorage.clear()
  },
}
