import VueRouter from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Edit from '../pages/Edit.vue'

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
    path: '/edit',
    component: Edit
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
