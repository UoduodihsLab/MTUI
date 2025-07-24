import { createBrowserRouter } from 'react-router'

import CustomLayout from '../layouts/CustomLayout'
import Home from '../pages/Home'
import Task from '../pages/Task'
import Bot from '../pages/Bot'
import Account from '../pages/Account'
import Channel from '../pages/Channel'
import Lang from '../pages/Language'

const router = createBrowserRouter([
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
