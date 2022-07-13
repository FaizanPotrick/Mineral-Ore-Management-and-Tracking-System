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
      path: '/miner/registration',
      name: 'Miner Registration',
      component: () => import('@/views/Miner/Registration.vue')
    },
    {
      path: '/miner/login',
      name: 'Miner Login',
      component: () => import('@/views/Miner/Login.vue')
    },
    {
      path: '/miner/ores',
      name: 'Miner Ores',
      component: () => import('@/views/Miner/OresForm.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/header',
      name: 'Header',
      component: () => import('@/components/Header.vue')
    }
  ]
}))
app.mount('#app')
