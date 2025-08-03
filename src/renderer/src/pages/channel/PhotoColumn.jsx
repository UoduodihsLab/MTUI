import { Space, Tag, Avatar } from 'antd'

export default function PhotoColumn({ record }) {
    let color = ''
    let text = ''

    switch (record.p_status) {
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
            text = '同步失败'
            break
        case 4:
            color = '#2ecc71'
            text = '已同步'
    }
    return (
        <>
            {record.p_status === 1 && <Tag color={color}>{text}</Tag>}
            {record.p_status !== 1 && (
                <Space>
                    <Tag color={color}>{text}</Tag>
                    <Avatar src={'data:image/png;base64,' + record.photo_base64} size={45} />
                </Space>
            )}
        </>
    )
}
