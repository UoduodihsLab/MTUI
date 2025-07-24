import { createBrowserRouter } from 'react-router'

import CustomLayout from '../layouts/CustomLayout'
import Home from '../pages/Home'
import Task from '../pages/Task'
import Bot from '../pages/Bot'

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
                path: '/task',
                Component: Task
            },
            {
                path: '/bot',
                Component: Bot
            }
        ]
    }
])

export default router
