import { Table, Space, Button } from 'antd'

const columns = [
    { title: '编号', dataIndex: 'id' },
    { title: 'username', dataIndex: 'username' },
    { title: 'token', dataIndex: 'token' },
    {
        title: '操作',
        key: 'x',
        render: () => (
            <Space>
                <Button type="primary" size="small">
                    修改
                </Button>
            </Space>
        )
    }
]

export default function BotTable({bots}) {
    return (
        <>
            <Table columns={columns} dataSource={bots} rowKey="id" bordered />
        </>
    )
}
