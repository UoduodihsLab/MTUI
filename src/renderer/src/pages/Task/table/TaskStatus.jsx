import { Tag } from 'antd'

export default function TaskStatus({ status }) {
    let label = ''
    let color = ''

    switch (status) {
        case 0:
            label = '等待执行'
            color = '#bdc3c7'
            break
        case 1:
            label = '执行中'
            color = '#3498db'
            break
        case 2:
            label = '已完成'
            color = '#2ecc71'
            break
        case 3:
            label = '失败'
            color = '#e74c3c'
            break
        case 4:
            label = '挂起中'
            color = '#e67e22'
            break
    }

    return <Tag color={color}>{label}</Tag>
}
