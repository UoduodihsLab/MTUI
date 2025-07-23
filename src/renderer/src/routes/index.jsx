import { createBrowserRouter } from 'react-router'

import CustomLayout from '../layouts/CustomLayout'
import Home from '../pages/Home'
import Task from '../pages/Task'

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
            }
        ]
    }
])

export default router
