import screenView from '@/views/screenView.vue'
import stationView from '@/views/stationView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/screen', component: screenView },
  { path: '/rotterdam', component: stationView },
  
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
