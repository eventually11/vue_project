import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/components/overview.vue'
import MapView from '@/components/map.vue'
import DailyView from '@/components/daily.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/map', component: MapView },
    { path: '/daily', component: DailyView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
