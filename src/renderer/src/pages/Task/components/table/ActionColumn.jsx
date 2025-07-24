import { Space, Button } from 'antd'
import taskApi from '@renderer/api/task'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function ActionColumn({ record }) {
    async function handleStartTask() {
        try {
            const res = await taskApi.startTask(record.id)
            if (res.code === 200) {
                messageApi.success(res.message)
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
    return (
        <>
            <Space>
                {status === 0 ? startButton : null}
                <Button type="info" size="small">
                    详情
                </Button>
            </Space>
        </>
    )
}
