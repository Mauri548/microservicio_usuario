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
  } 
  ,
  {
    path: '/RecoverPass1',
    name: 'RecoverPass1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contraseña/RecoverPass1.vue')
  } 
  ,
  {
    path: '/RecoverPass2',
    name: 'RecoverPass2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contraseña/RecoverPass2.vue')
  } 
  ,
  {
    path: '/RecoverPass3',
    name: 'RecoverPass3',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contraseña/RecoverPass3.vue')
  } 
  ,
  {
    path: '/RecoverPass4',
    name: 'RecoverPass4',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contraseña/RecoverPass4.vue')
  } 
  ,
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      
    ]
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
