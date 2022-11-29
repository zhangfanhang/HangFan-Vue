import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '@/utils/storage.js'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    component: () => import('@/components/Layout.vue'),
    meta: { title: '首页' },
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '欢迎页',
        },
      },
      {
        name: 'table',
        path: 'table',
        component: () => import('@/views/Table.vue'),
        meta: {
          title: '公共表格',
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' },
  },
  {
    name: '404',
    path: '/404',
    meta: { title: '访问出错啦' },
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

/**
 *  全局前置守卫
 *  vue-router 4 建议不使用`next`写法
 */
router.beforeEach(async (to, from) => {
  console.log('全局前置守卫被触发!')
  // 判断访问路径是否正确 不正确跳转404页面
  let hasPermission =
    router.getRoutes().filter((route) => route.path === to.path).length > 0
  if (!hasPermission) return { name: '404' }
  // 用户状态判断逻辑
  // 检查用户是否已登录 ❗️避免无限重定向
  if (!storage.getItem('isLogin') && to.name !== 'login') {
    return { name: 'login' }
    // 登录状态不允许访问login
  } else if (storage.getItem('isLogin') && to.name === 'login') {
    return { name: from.name }
  }
  //    页面标题
  if (router.hasRoute(to.name)) {
    document.title = `${to.meta.title}|HangFan-EHR-Template`
  }
})

export default router
