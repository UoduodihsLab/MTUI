import Home from '../views/home.vue'
import Account from '../views/account/index.vue'
// import Link from '../views/link/index.vue'
import Channel from '../views/channel/index.vue'
import Task from '../views/task/index.vue'
import Bot from '../views/bot/index.vue'
import Setting from '../views/setting/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
        title: '主页'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
        title: '账号管理'
    }
  },
  {
    path: '/channel',
    name: 'channel',
    component: Channel,
    meta: {
        title: '频道管理'
    }
  },
  {
    path: '/task',
    name: 'task',
    component: Task,
    meta: {
        title: '任务管理'
    }
  },
  {
    path: '/bot',
    name: 'bot',
    component: Bot,
    meta: {
        title: '机器人管理'
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
        title: '系统设置'
    }
  },
]

export default routes
