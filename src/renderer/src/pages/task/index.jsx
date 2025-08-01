import { useState, useEffect, useMemo } from 'react'
import { Space, Button, Modal } from 'antd'

import PageView from '@renderer/components/PageView'
import { TaskDetailModalProvider } from './context/TaskDetailModalContext'
import useTModal from '@renderer/hooks/useTModal'
import TaskTable from '@renderer/pages/Task/components/table/TaskTable'

import CreateTaskForm from './components/forms/CreateTaskForm'

import api from '@renderer/api/http'

import usePagination from '@renderer/hooks/usePagination'

function Task() {
    const createModal = useTModal()

    const [tasks, setTasks] = useState([])

    const pagination = usePagination()

    async function getTasks(page = 1, size = 10) {
        try {
            const result = await api.get(`/tasks?page=${page}&size=${size}`)
            if (result.code === 200) {
                setTasks(result.data.tasks)
                pagination.update(page, size, result.data.count)
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
        return tasks.some((task) => task.status === '执行中')
    }, [tasks])

    useEffect(() => {
        if (!hasInProgressTasks) {
            return
        }

        const intervalID = setInterval(() => updateTasks(), 2000)

        return () => clearInterval(intervalID)
    }, [hasInProgressTasks])

    function handleTableChange(newPagination) {
        getTasks(newPagination.current, newPagination.pageSize)
    }

    return (
        <PageView>
            <Space>
                <Button type="primary" onClick={createModal.openModal}>
                    创建任务
                </Button>
            </Space>

            <div className="mt-[12px]">
                <TaskDetailModalProvider>
                    <TaskTable
                        tasks={tasks}
                        updateTasks={updateTasks}
                        pagination={pagination}
                        handleTableChange={handleTableChange}
                    />
                </TaskDetailModalProvider>
            </div>

            <div>
                <Modal title="创建任务" footer={null} {...createModal.modalProps}>
                    <CreateTaskForm updateTasks={updateTasks} closeModal={createModal.closeModal} />
                </Modal>
            </div>
        </PageView>
    )
}

export default Task
