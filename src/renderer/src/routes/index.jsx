import { createHashRouter } from 'react-router'

import CustomLayout from '../layouts/CustomLayout'
import Home from '../pages/Home'
import Task from '../pages/task'
import Bot from '../pages/bot'
import Account from '../pages/account'
import Channel from '../pages/channel'
import Lang from '../pages/lang'

const router = createHashRouter([
    {
        path: '/',
        Component: CustomLayout,
        children: [
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/account',
                Component: Account
            },
            {
                path: '/channel',
                Component: Channel
            },
            {
                path: '/task',
                Component: Task
            },
            {
                path: '/bot',
                Component: Bot
            },
            {
                path: '/lang',
                Component: Lang
            }
        ]
    }
])

export default router
