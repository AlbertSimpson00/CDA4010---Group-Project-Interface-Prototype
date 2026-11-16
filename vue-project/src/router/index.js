import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Page1 from '../components/Page1.vue'
import Page2 from '../components/Page2.vue'
import Page3 from '../components/Page3.vue'
import Page4 from '../components/Page4.vue'
import Page5 from '../components/Page5.vue'
import Success from '../components/Success.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/page1', name: 'Page1', component: Page1 },
  { path: '/page2', name: 'Page2', component: Page2 },
  { path: '/page3', name: 'Page3', component: Page3 },
  { path: '/page4', name: 'Page4', component: Page4 },
  { path: '/page5', name: 'Page5', component: Page5 },
  { path: '/success', name: 'Success', component: Success }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
