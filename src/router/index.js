import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
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
    path: '/Action',
    name: 'ActionsModal',
    component: () => import(/* webpackChunkName: "about" */ '../components/Modals/ActionsModal.vue')
  } 
  ,
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true},
    children:[
      {
        path: '/PersonalForm',
        name: 'PersonalForm',
        component: () => import(/* webpackChunkName: "about" */ '../components/PersonalInfo/PersonalForm.vue')
      },
      {
        path: '/CreateCompany',
        name: 'CreateCompany',
        component: () => import(/* webpackChunkName: "CreateCompany" */ '../views/CreateCompany/CreateCompany.vue')
      },
      {
        path: '/CreateFinishedCompany',
        name: 'CreateFinishedCompany',
        component: () => import(/* webpackChunkName: "CreateFinishedCompany" */ '../views/CreateCompany/CreateCompanyFinish.vue')
      },
      {
        path: '/UserDashboard',
        name: 'UserDashboard',
        alias: '/',
        component: () => import(/* webpackChunkName: "UserDashboard" */ '../views/Users/UserDashboard.vue')
      },
      {
        path: '/PermissionsDashboard',
        name: 'PermissionsDashboard',
        component: () => import(/* webpackChunkName: "PermissionsDashboard" */ '../views/Permissions/PermissionsDashboard.vue')
      },
      {
        path: '/CompaniesDashboard',
        name: 'CompaniesDashboard',
        component: () => import(/* webpackChunkName: "CompaniesDashboard" */ '../views/Companies/CompaniesDashboard.vue')
      },
      {
        path: '/EditCompany/:id',
        name: 'EditCompany',
        component: () => import(/* webpackChunkName: "EditCompany" */ '../views/Companies/EditCompany.vue')
      },
      {
        path: '/InviteUser',
        name: 'InviteUser',
        component: () => import(/* webpackChunkName: "InviteUser" */ '../views/InviteUser/InviteUser.vue')
      },
      {
        path: '/AppDashboard',
        name: 'AppDashboard',
        component: () => import(/* webpackChunkName: "AppDashboard" */ '../views/Apps/AppDashboard.vue')
      },
      {
        path: '/EditApp/:id',
        name: 'EditApp',
        component: () => import(/* webpackChunkName: "EditApp" */ '../views/Apps/Edit.vue')
      },
      {
        path: '/AddApp',
        name: 'AddApp',
        component: () => import(/* webpackChunkName: "AddApp" */ '../views/Apps/Add.vue')
      },
      {
        path: '/PermissionsManagement',
        name: 'PermissionsManagement',
        component: () => import(/* webpackChunkName: "PermissionsManagement" */ '../views/Permissions/PermissionsManagement.vue')
      },
      {
        path: '/LicencesDashboard',
        name: 'LicencesDashboard',
        component: () => import(/* webpackChunkName: "LicencesDashboard" */ '../views/licences/LicenceDashboard.vue')
      },
      {
        path: '/LabelKeyDashboard',
        name: 'LabelKeyDashboard',
        component: () => import(/* webpackChunkName: "LicencesDashboard" */ '../views/LabelKeys/LabelKeyDashboard.vue')
      },
      {
        path: '/AppSuscription',
        name: 'AppSuscription',
        component: () => import(/* webpackChunkName: "AppSuscription" */ '../views/Apps/AppSuscription.vue')
      }
      ,
      {
        path: '/InvitationsDashboard',
        name: 'InvitationsDashboard',
        component: () => import(/* webpackCunkName: "LicencesDashboard" */ '../views/Invitations/InvitationsDashboard.vue')
      }
      ,
      {
        path: '/UpdateSuscription/:id',
        name: 'UpdateSuscription',
        component: () => import(/* webpackCunkName: "LicencesDashboard" */ '../views/Subscripciones/UpdateSuscription.vue')
      }
      ,
      {
        path: '/SubscriptionsDashboard',
        name: 'SubscriptionsDashboard',
        component: () => import(/* webpackCunkName: "LicencesDashboard" */ '../views/Subscripciones/SubscriptionsDashboard.vue')
      }
    ]
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * 
 * Valida que el usuario este registrado para permitirte ingresar a la página
 * de no estar registrado te redirecciona a login
 * 
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user-token')) {
      next()
    } else {
      next({name: "login"})
    }
  } else {
    next()
  }
})

export default router
