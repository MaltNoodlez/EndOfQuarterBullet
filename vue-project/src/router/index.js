import screenView from '@/views/screenView.vue'
import StartView from '@/views/startView.vue'
import stationView from '@/views/stationView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'
const routes = [
  { path: '/start', component: StartView },
  { path: '/screen', component: screenView },
  { path: '/', component: stationView },
  // { path: '/', component: GameView },
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
