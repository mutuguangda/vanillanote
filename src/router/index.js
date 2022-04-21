import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from '@/utils/nprogress'

Vue.use(VueRouter)

import Layout from '@/layout'


const routes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'page/1',
    children: [
      {
        path: 'page/:currentPage',
        component: (resolve) => require(['@/views/index'], resolve),
      },
      {
        path: 'post/:postId',
        component: (resolve) => require(['@/views/post'], resolve),
      },
      {
        path: 'archive',
        component: (resolve) => require(['@/views/archive'], resolve),
      },
      {
        path: 'links',
        component: (resolve) => require(['@/views/links'], resolve),
      },
      {
        path: 'about',
        component: (resolve) => require(['@/views/about'], resolve),
      },
      {
        path: 'topic',
        component: (resolve) => require(['@/views/topic'], resolve),
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 挂载 nprogress 进度条
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   next()
// })

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
