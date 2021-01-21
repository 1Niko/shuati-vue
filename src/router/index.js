import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    children:[
      {
      path: '/single',
      name: 'Single',
      component: () => import('@/views/shuati/Tsingle.vue'),
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
