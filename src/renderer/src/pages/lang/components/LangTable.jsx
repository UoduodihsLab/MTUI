import { Table } from 'antd'

export default function LangTable({ langs }) {
    const columns = [
        { title: '名称', dataIndex: 'title' },
        { title: '代码', dataIndex: 'code' }
    ]
    return <Table columns={columns} dataSource={langs} rowKey="id" bordered />
}
