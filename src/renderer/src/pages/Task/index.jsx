import { useState, useEffect, useMemo } from 'react'
import { Space, Button, Modal } from 'antd'

import PageView from '@renderer/components/PageView'
import useTModal from '@renderer/hooks/useTModal'
import TaskTable from '@renderer/pages/Task/components/table/TaskTable'

import CreateTaskForm from './components/TaskForms/CreateTaskForm'

import api from '@renderer/api/http'

function Task() {
    const createModal = useTModal()

    const [tasks, setTasks] = useState([])

    async function getTasks(page = 1, size = 10) {
        try {
            const result = await api.get(`/tasks`)
            if (result.code === 200) {
                setTasks(result.data.tasks)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function updateTasks() {
        getTasks()
    }

    useEffect(() => {
        updateTasks()
    }, [])

    const hasInProgressTasks = useMemo(() => {
        return tasks.some((task) => task.status === 1)
    }, [tasks])

    useEffect(() => {
        if (!hasInProgressTasks) {
            return
        }

        const intervalID = setInterval(() => updateTasks(), 2000)

        return () => clearInterval(intervalID)
    }, [hasInProgressTasks])

    return (
        <PageView>
            <Space>
                <Button type="primary" onClick={createModal.openModal}>
                    创建任务
                </Button>
            </Space>

            <div className="mt-[12px]">
                <TaskTable tasks={tasks} updateTasks={updateTasks} />
            </div>

            <div>
                <Modal title="创建任务" {...createModal.modalProps}>
                    <CreateTaskForm updateTasks={updateTasks} />
                </Modal>
            </div>
        </PageView>
    )
}

export default Task
