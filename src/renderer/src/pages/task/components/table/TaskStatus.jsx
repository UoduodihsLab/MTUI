import { Tag } from 'antd'

export default function TaskStatus({ status }) {
    let color = ''

    switch (status) {
        case '待处理':
            color = '#bdc3c7'
            break
        case '执行中':
            color = '#3498db'
            break
        case '已完成':
            color = '#2ecc71'
            break
        case '失败':
            color = '#e74c3c'
            break
        case '挂起中':
            color = '#e67e22'
            break
    }

    return <Tag color={color}>{status}</Tag>
}
