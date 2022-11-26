import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import { ElMessage } from 'element-plus'
import NotFoundPage from '../views/NotFoundPage.vue'

const NOT_FOUND_URL = { path: ":url(.*)*", component: NotFoundPage };

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name:'login', component: LoginPage, meta: { isPublic: true } },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    children: [
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "home" */'../views/TeacherPage.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: "home" */'../views/UserPage.vue')
      },
      { path: 'welcome', component: () => import(/* webpackChunkName: "home" */'../views/WelcomePage.vue') },
      {
        path: 'roles',
        name: 'roles',
        component: () => import(/* webpackChunkName: "home" */'../views/RolePage.vue')
      },
      {
        path: 'rights',
        component: () => import(/* webpackChunkName: "home" */'../views/RightsPage.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "home" */'../views/GoodsPage.vue')
      },
      { path: 'params', component: () => import(/* webpackChunkName: "home" */'../views/GoodsParamsPage.vue') },
      {
        path: 'categories',
        component: () => import(/* webpackChunkName: "home" */'../views/CategoryPage.vue')
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "home" */'../views/OrderPage.vue')

      },
      {
        path: 'addgood',
        name: 'addgood',
        component: () => import(/* webpackChunkName: "home" */'../views/AddGoodPage.vue')
      },
      NOT_FOUND_URL
    ]
  },
  { path: '/:url(.*)*', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  if(to.meta.isPublic) {
    return true
  }
  if(sessionStorage.getItem('token')) {
    return true
  }
  ElMessage.error('未授权访问, 请联系管理员')


  return {
    name: 'login'
  }
})

export default router
