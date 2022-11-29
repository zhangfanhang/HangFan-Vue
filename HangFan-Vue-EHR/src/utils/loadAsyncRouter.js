    import storage from "@/utils/storage.js";
    import {getPermissionList} from "@/api/home.js";
    import {generateRoute} from "@/utils/generateRoute.js";
    import router from "@/router/index.js";

    /**
     *
     * @returns {Promise<void>}
     * @description 加载路由
     */
    export const loadAsyncRouter = async () => {
        const userInfo = storage.getItem('userInfo') || {}
        if (userInfo.token) {
            const {menuList} = await getPermissionList()
            const routes = generateRoute(menuList)
            const modules = import.meta.glob('../views/*.vue')
            routes.forEach(route => {
                let url = `../views/${route.name}.vue`
                route.component = modules[url];
                router.addRoute("home", route);
            })
        }
    }