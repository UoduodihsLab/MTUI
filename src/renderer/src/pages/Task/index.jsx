import { useState } from 'react'
import { Space, Button, Modal } from 'antd'

import PageView from '../../components/PageView'
import useCreateTaskModal from './hooks/useCreateTaskModal'
import useCreateTaskForm from './hooks/useCreateTaskForm'
import TaskTable from './table/TaskTable'

import CreateTaskForm from './components/TaskForms/CreateTaskForm'

function Task() {
    const createModal = useCreateTaskModal()
    return (
        <PageView>
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

            <div className="mt-[12px]">
                <TaskTable />
            </div>
        </PageView>
    )
}

export default Task
