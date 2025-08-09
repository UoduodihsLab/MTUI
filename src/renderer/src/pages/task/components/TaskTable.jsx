import { Table, Button } from 'antd'
import { localFTime } from '@renderer/utils/tools'
import StatusColumn from './StatusColumn'
import TypeColumn from './TypeColumn'

export default function TaskTable({ tasks, getTasks, pagination, showLogs }) {
    const columns = [
        { title: '任务名称', dataIndex: 'title' },
        {
            title: '状态',
            dataIndex: 'status',
            render: (_, record) => (
                <StatusColumn record={record} getTasks={getTasks} pagination={pagination} />
            )
        },
        {
            title: '类型',
            dataIndex: 't_type',
            render: (_, record) => <TypeColumn record={record} />
        },
        { title: '创建时间', dataIndex: 'created_at', render: (value) => localFTime(value) },
        {
            title: '操作',
            dataIndex: 'x',
            render: (_, record) => (
                <Button onClick={() => showLogs(record)} type="primary" size="small">
                    日志
                </Button>
            )
        }
    ]
    return (
        <>
            <Table columns={columns} dataSource={tasks} rowKey="id" bordered />
        </>
    )
}
