import { List } from 'antd'

export default function Logs({ logs }) {
    // const log_items = logs.map((item) => (
    //     <List.Item>
    //         <span>{item.detail}</span>
    //     </List.Item>
    // ))
    return (
        <>
            <List
                dataSource={logs}
                header={null}
                footer={null}
                rowKey="id"
                renderItem={(item) => (
                    <List.Item style={{ overflow: 'auto' }}>
                        <p>{item.detail}</p>
                    </List.Item>
                )}
                style={{ maxHeight: 400, overflowY: 'auto' }}
            />
        </>
    )
}
