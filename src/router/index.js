import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/CreateCompany',
        name: 'CreateCompany',
        component: () => import(/* webpackChunkName: "CreateCompany" */ '../views/CreateCompany.vue')
      }
    ]
  },
 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
