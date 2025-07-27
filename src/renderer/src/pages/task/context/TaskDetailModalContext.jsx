import { createContext, useContext, useState } from 'react'

import { Modal } from 'antd'

const TaskDetailContext = createContext(null)

export function useTaskDetailModal() {
    const ctx = useContext(TaskDetailContext)
    if (!ctx) throw new Error('useTaskDetailModal must be used in Provider')

    return ctx
}

export function TaskDetailModalProvider({ children }) {
    const [visible, setVisible] = useState(false)
    const [record, setRecord] = useState(null)

    function show(rec) {
        setRecord(rec)
        setVisible(true)
    }

    function hide() {
        setVisible(false)
        setRecord(null)
    }

    const detail = (() => {
        try {
            console.log(record)
            const result = record.result
            const success = result.success.join('\n')
            const errors = result.errors.join('\n')

            return `${success} \n ${errors}`
        } catch (error) {
            return null
        }
    })()

    return (
        <TaskDetailContext.Provider value={{ show }}>
            {children}
            <Modal title="结果详情" open={visible} onCancel={hide} onOk={hide} footer={null}>
                <p>{detail}</p>
            </Modal>
        </TaskDetailContext.Provider>
    )
}
