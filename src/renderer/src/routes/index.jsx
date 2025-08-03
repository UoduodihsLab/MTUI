import { createHashRouter } from 'react-router'

import CustomLayout from '@renderer/layout/CustomLayout'
import Task from '@renderer/pages/task'
import Bot from '@renderer/pages/bot'
import Account from '@renderer/pages/account'
import Channel from '@renderer/pages/channel'

const router = createHashRouter([
    {
        path: '/',
        Component: CustomLayout,
        children: [
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
        ]
    }
])

export default router
