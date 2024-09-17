import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/main/index.vue'
import MapView from '@/pages/map/index.vue'
import DailyView from '@/pages/daily/index.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/map', component: MapView },
    { path: '/daily', component: DailyView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
