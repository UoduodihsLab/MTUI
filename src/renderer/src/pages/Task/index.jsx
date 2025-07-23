import { useState } from 'react'
import { Space, Button, Modal } from 'antd'

import useCreateTaskModal from './hooks/useCreateTaskModal'
import useCreateTaskForm from './hooks/useCreateTaskForm'

import CreateTaskForm from './components/TaskForms/CreateTaskForm'

function Task() {
    const createModal = useCreateTaskModal()
    return (
        <div>
            <Space>
                <Button type="primary" onClick={createModal.openModal}>
                    创建任务
                </Button>
            </Space>

            <div>
                <Modal title="创建任务" {...createModal.modalProps}>
                    <CreateTaskForm />
                </Modal>
            </div>
        </div>
    )
}

export default Task
