import { useState, useEffect } from 'react'
import { Space, Button, Modal } from 'antd'
import usePagination from '@renderer/hooks/usePagination'
import PageView from '@renderer/components/PageView'
import TaskTable from './components/TaskTable'
import useTModal from '@renderer/hooks/useTModal'
import CreateTaskForm from './components/CreateTaskForm'
import Logs from './components/Logs'

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
    const modalToShowLogs = useTModal()

    const [logs, setLogs] = useState([])
    async function showLogs(record) {
        try {
            const res = await api.get(`/tasks/${record.id}/logs`)
            if (res.code === 200) {
                console.log(res.data.logs)
                setLogs(res.data.logs)
                modalToShowLogs.openModal()
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            console.error(error)
            messageApi.error('网络错误')
        }
    }
    return (
        <>
            <PageView>
                <div>
                    <Space>
                        <Button onClick={modalToCreateTask.openModal}>创建任务</Button>
                    </Space>
                </div>
                <div className="mt-[12px]">
                    <TaskTable
                        tasks={tasks}
                        getTasks={getTasks}
                        pagination={pagination}
                        showLogs={showLogs}
                    />
                </div>

                <div>
                    <Modal title="创建任务" {...modalToCreateTask.modalProps} footer={null}>
                        <CreateTaskForm getTasks={getTasks} pagination={pagination} />
                    </Modal>
                    <Modal
                        title="任务日志"
                        {...modalToShowLogs.modalProps}
                        footer={null}
                    >
                        <Logs logs={logs} />
                    </Modal>
                </div>
            </PageView>
        </>
    )
}
