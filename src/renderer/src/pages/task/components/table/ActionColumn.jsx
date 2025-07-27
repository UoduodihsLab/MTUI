import { Space, Button } from 'antd'
import {useTaskDetailModal} from '../../context/TaskDetailModalContext'
import taskApi from '@renderer/api/task'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function ActionColumn({ record, updateTasks, openDetailsModal }) {
    async function handleStartTask() {
        try {
            const res = await taskApi.startTask(record.id)
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
            {status === 0 ? startButton : null}
            {status !== 0 || status !== 1 ? detailsButton : null}
        </Space>
    )
}
