import { useState, useEffect, useMemo } from 'react'
import { Table, Space, Button } from 'antd'
import TaskStatus from './TaskStatus'
import ActionColumn from './ActionColumn'
import TaskProgress from './TaskProgress'
import { localFTime } from '@renderer/utils/tools'

export default function TaskTable({ tasks, updateTasks, pagination, handleTableChange }) {
    const columns = [
        { title: '编号', dataIndex: 'id'},
        { title: '名称', dataIndex: 'title'},
        { title: '类型', dataIndex: 't_type'},
        { title: '参数', dataIndex: 'args', ellipsis: true },
        { title: '状态', dataIndex: 'status', render: (value)=><><TaskStatus status={value} /></>},
        {
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            ellipsis: true,
            width: 250,
            render: (_, record) => <TaskProgress record={record} />
        },
        {
            title: '详情',
            dataIndex: 'error_detail',
            render: (value)=> value ? value.detail : '-'
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'create_at',
            render: (create_at) => localFTime(create_at),
            ellipsis: true
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            fixed: 'right',
            render: (_, record) => <ActionColumn record={record} updateTasks={updateTasks} />
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            bordered
            pagination={pagination.pgProps}
            onChange={handleTableChange}
            scroll={{ x: 'max-content' }}
        />
    )
}
