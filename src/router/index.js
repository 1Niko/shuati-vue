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
    },
      //写在main的children下面应用main中的样式 （Hamburger 和 MenuTree ）
      {
        path:'/welcome',
        name:'Welcome',
        component:() =>import('@/views/Welcome.vue')
      },
      {
        path:'/judgment',
        name:'Judgment',
        component:() => import('@/views/shuati/Tjudgment.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
