import { Tag } from 'antd'
export default function TypeColumn({ record }) {
    let text = ''
    switch (record.t_type) {
        case 1:
            text = '同步频道'
            break
        case 2:
            text = '同步username'
            break
        case 3:
            text = '同步简介'
            break
        case 4:
            text = '同步头像'
            break
        case 5:
            text = '发布内容'
            break
        case 6:
            text = '设置机器人管理员'
            
    }
    return (
        <>
            <Tag color="#3498db">{text}</Tag>
        </>
    )
}
