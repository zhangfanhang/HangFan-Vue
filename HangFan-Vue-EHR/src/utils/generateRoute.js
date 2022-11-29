/**
 * @description 生成动态路由
 * @param list
 * @returns {*[]}
 */
export function generateRoute(list) {
    const routes = []
    const deep = (list) => {
        list.forEach(item => {
            if (item.action) {
                routes.push({
                    name: item.component,
                    path: item.path,
                    component: item.component,
                    meta: {
                        title: item.menuName
                    }
                })
            }else if(item.children&&!item.action){
                deep(item.children)
            }
        })
    }
    deep(list)
    return routes
}