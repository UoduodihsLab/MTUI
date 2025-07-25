import { useState, useEffect, useMemo } from 'react'
import { Table, Space, Button } from 'antd'
import TaskStatus from './TaskStatus'
import ActionColumn from './ActionColumn'
import TaskProgress from './TaskProgress'
import { localFTime } from '@renderer/utils/tools'

export default function TaskTable({ tasks, updateTasks }) {
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
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            render: (_, record) => <TaskProgress record={record} />
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
            render: (_, record) => <ActionColumn record={record} updateTasks={updateTasks} />
        }
    ]

    return <Table columns={columns} dataSource={tasks} rowKey="id" bordered />
}
