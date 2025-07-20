import { createRouter, createWebHashHistory } from 'vue-router'

import Account from '../views/account/index.vue'
import Link from '../views/link/index.vue'

import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
