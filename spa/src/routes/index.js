import VueRouter from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound'

const routes = [
  {
    path: '/',
    component: Dashboard
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
