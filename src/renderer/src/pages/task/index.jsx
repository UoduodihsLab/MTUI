import { useState, useEffect } from 'react'
import { Space, Button, Modal } from 'antd'
import usePagination from '@renderer/hooks/usePagination'
import PageView from '@renderer/components/PageView'
import TaskTable from './components/TaskTable'
import useTModal from '@renderer/hooks/useTModal'
import CreateTaskForm from './components/CreateTaskForm'

import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function Task() {
    const [tasks, setTasks] = useState([])
    const pagination = usePagination()

    async function getTasks(page, size) {
        try {
            const res = await api.get(`/tasks?page=${page}&size=${size}`)
            if (res.code === 200) {
                setTasks(res.data.tasks)
                pagination.update(page, size, res.data.count)
            }
        } catch (error) {
            messageApi.error(网络错误)
        }
    }

    useEffect(() => {
        getTasks(1, 10)
    }, [])

    const modalToCreateTask = useTModal()
    return (
        <>
            <PageView>
                <div>
                    <Space>
                        <Button onClick={modalToCreateTask.openModal}>创建任务</Button>
                    </Space>
                </div>
                <div className="mt-[12px]">
                    <TaskTable tasks={tasks} getTasks={getTasks} pagination={pagination} />
                </div>

                <div>
                    <Modal title="创建任务" {...modalToCreateTask.modalProps} footer={null}>
                        <CreateTaskForm getTasks={getTasks} pagination={pagination} />
                    </Modal>
                </div>
            </PageView>
        </>
    )
}
