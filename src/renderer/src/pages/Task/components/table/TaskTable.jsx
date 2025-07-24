import { useState, useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import TaskStatus from './TaskStatus'
import ActionColumn from './ActionColumn'
import { localFTime } from '@renderer/utils/tools'
import api from '@renderer/api/http'

export default function TaskTable() {
    const columns = [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '名称', dataIndex: 'title', key: 'title' },
        { title: '类型', dataIndex: 't_type', key: 't_type' },
        { title: '参数', dataIndex: 'args', key: 'args', ellipsis: true },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <TaskStatus status={status} />
        },
        {
            title: '创建时间',
            dataIndex: 'create_at',
            key: 'create_at',
            render: (create_at) => localFTime(create_at),
            ellipsis: true
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            render: (_, record) => <ActionColumn record={record} />
        }
    ]

    const [tasks, setTasks] = useState([])

    async function getTasks(page = 1, size = 10) {
        try {
            const result = await api.get(`/tasks`)
            if (result.code === 200) {
                setTasks(result.data.tasks)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])
    return <Table columns={columns} dataSource={tasks} rowKey="id" bordered />
}
