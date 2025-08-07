import { Space, Tag } from 'antd'

export default function AboutColumn({ record }) {
    let color = ''
    let text = ''

    switch (record.c_status) {
        case 1:
            color = '#3498db'
            text = '未同步'
            break
        case 2:
            color = '#2ecc71'
            text = '已同步'
            break
    }
    return (
        <>
            {record.c_status === 1 && <Tag color={color}>{text}</Tag>}
            {record.c_status !== 1 && (
                    <Space>
                        <Tag color={color}>{text}</Tag>
                        <span>{record.tid}</span>
                    </Space>
            )}
        </>
    )
}
