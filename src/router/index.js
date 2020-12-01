import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/home/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/room',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'Room',
      component: () => import('@/views/home/room'),
      meta: {title: '个人中心', icon: 'dashboard', affix: false}
    }]
  },
  {
    path: '/system',
    redirect: 'noRedirect',
    component: Layout,
    meta: {title: '系统管理', icon: 'el-icon-setting'},
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: {title: '用户管理', icon: 'user', affix: false}
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role'),
        meta: {title: '角色管理', icon: 'el-icon-key', affix: false}
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu'),
        meta: {title: '资源管理', icon: 'el-icon-folder-opened', affix: false}
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = []
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
