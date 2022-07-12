import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)
app.use(createPinia())
app.use(createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/miner/login',
      name: 'MinerLogin',
      component: () => import('@/views/Miner/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    }
  ]
}))
app.mount('#app')
