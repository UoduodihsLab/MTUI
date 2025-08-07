import { Popconfirm } from 'antd'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function StatusColumn({ record, getTasks, pagination }) {
    let color = ''
    let text = ''
    let icon = null

    switch (record.status) {
        case 1:
            color = '#e74c3c'
            text = '未启动'
            icon = <PauseOutlined style={{ color, fontSize: 16 }} />
            break
        case 2:
            color = '#2ecc71'
            text = '运行中'
            icon = <CaretRightOutlined style={{ color, fontSize: 16 }} />
    }

    async function startTask() {
        try {
            const res = await api.post(`/tasks/${record.id}/start`)
            if (res.code === 200) {
                await getTasks(pagination.page, pagination.size)
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }

    async function pauseTask() {
        try {
            const res = await api.post(`/tasks/${record.id}/pause`)
            if (res.code === 200) {
                await getTasks(pagination.page, pagination.size)
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }

    async function handleClickStatus() {
        if (record.status === 1) {
            await startTask()
        }
        if (record.status === 2) {
            await pauseTask()
        }
    }
    return (
        <>
            <Popconfirm
                title={null}
                description={`确认${record.status === 1 ? '启动' : '关闭'}任务?`}
                onConfirm={handleClickStatus}
                okText="确认"
                cancelText="取消"
            >
                <div className="flex items-center cursor-pointer font-[500]">
                    <span style={{ color }}>{text}</span>
                    {icon}
                </div>
            </Popconfirm>
        </>
    )
}
