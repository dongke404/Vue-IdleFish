// import Vue from 'vue'
// import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/showdata'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        path: '/showdata',
        name: 'Showdata',
        component: () => import('../views/home/content/showdata/Showdata.vue'),
        meta: { title: '置顶信息' },
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../views/home/content/add/Add.vue'),
        meta: { title: '添加置顶' },
      },
      {
        path: '/extend',
        name: 'Extend',
        component: () => import('../views/home/content/extend/Extend.vue'),
        meta: { title: '扩展内容' },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/login/Login.vue'),
  },

  {
    path: '*',
    name: 'Error',
    component:() => import( '../views/error/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
