import { Space, Tag } from 'antd'

export default function AboutColumn({ record }) {
    let color = ''
    let text = ''

    switch (record.u_status) {
        case 1:
            color = '#f1c40f'
            text = '未设置'
            break
        case 2:
            color = '#3498db'
            text = '未同步'
            break
        case 3:
            color = '#e74c3c'
            text = '被占用'
            break
        case 4:
            color = '#e74c3c'
            text = '需购买'
            break
        case 5:
            color = '#e74c3c'
            text = '失败'
            break
        case 6:
            color = '#2ecc71'
            text = '已同步'
            break
    }
    return (
        <>
            {record.u_status === 1 && <Tag color={color}>{text}</Tag>}
            {record.u_status !== 1 && (
                    <Space>
                        <Tag color={color}>{text}</Tag>
                        <span>{record.username}</span>
                    </Space>
            )}
        </>
    )
}
