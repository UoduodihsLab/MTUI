import { Space, Button } from 'antd'
import {useTaskDetailModal} from '../../context/TaskDetailModalContext'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function ActionColumn({ record, updateTasks, openDetailsModal }) {
    async function handleStartTask() {
        try {
            const res = await api.post(`/tasks/${record.id}/start`)
            if (res.code === 200) {
                messageApi.success(res.message)
                updateTasks()
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error(error)
        }
    }
    const status = record.status
    const startButton = (
        <Button type="primary" size="small" onClick={handleStartTask}>
            启动
        </Button>
    )

    const { show } = useTaskDetailModal()
    const detailsButton = (
        <Button type="info" size="small" onClick={() => show(record)}>
            详情
        </Button>
    )
    return (
        <Space>
            {status === '待处理' || status === '部分完成' ? startButton : null}
            {status !== '待处理' || status !== '执行中' ? detailsButton : null}
        </Space>
    )
}
