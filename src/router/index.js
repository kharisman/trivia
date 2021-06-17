import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: lazyLoad('Home')
  },
  {
    path: '/trivia',
    name: 'Trivia',
    component: lazyLoad('Trivia')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/trivia/:id',
    name: 'TriviaPage',
    component: lazyLoad('TriviaPage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
