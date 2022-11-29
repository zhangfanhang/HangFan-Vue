import {createApp} from "vue"
import ElementPlus from "element-plus"
import App from "./App.vue"
import router from "./router"
import storage from "./utils/storage.js"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// 样式重置
import "normalize.css"
import "./style/index.scss"
import {createPinia} from "pinia"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import 'animate.css'

const app = createApp(App)
// 引入icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// avue
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
// viewer
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
// 按钮权限判断自定义指令
app.directive('permission', {
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding) {
        let userAction = storage.getItem('userAction')
        if (!userAction.includes(binding.value)) {
            // 隐藏元素
            el.style.display = 'none'
            // 变成宏任务 防止元素未插入 DOM 删除元素报错
            setTimeout(() => {
                el.parentNode.removeChild(el)
            }, 0)
        }
    }
})
app.use(Avue).use(VueViewer).use(ElementPlus, {locale: zhCn}).use(createPinia()).use(router).mount("#app")