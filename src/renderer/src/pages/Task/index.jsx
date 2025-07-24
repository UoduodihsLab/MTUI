import { useState } from 'react'
import { Space, Button, Modal } from 'antd'

import PageView from '../../components/PageView'
import useTModal from '../../hooks/useTModal'
import TaskTable from './table/TaskTable'

import CreateTaskForm from './components/TaskForms/CreateTaskForm'

function Task() {
    const createModal = useTModal()

    return (
        <PageView>
            <Space>
                <Button type="primary" onClick={createModal.openModal}>
                    创建任务
                </Button>
            </Space>


            <div className="mt-[12px]">
                <TaskTable />
            </div>
            
            <div>
                <Modal title="创建任务" {...createModal.modalProps}>
                    <CreateTaskForm />
                </Modal>
            </div>
        </PageView>
    )
}

export default Task
