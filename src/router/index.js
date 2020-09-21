import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由 只能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // search 框
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // article 文章内容呈现
  {
    path: '/article/:articleID',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
  },
  // 用户界面
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
