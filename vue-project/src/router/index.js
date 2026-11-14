
import { createRouter, createWebHistory } from 'vue-router'

import Page1 from '../components/Page1.vue'
import Page2 from '../components/Page2.vue'
import Page3 from '../components/Page3.vue'

import Page3 from '../components/Page5.vue'

const routes = [
  {
    path: '/',
    name: 'Page1',
    component: Page1
  },
  {
    path: '/page2',
    name: 'Page2',
    component: Page2
  },
  {
    path: '/page3',
    name: 'Page3',
    component: Page3
  },
  {
  path: '/page5',
  name: 'Page5',
  component: Page5
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
