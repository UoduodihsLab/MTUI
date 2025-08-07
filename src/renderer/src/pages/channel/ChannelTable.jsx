import { useState } from 'react'
import { Button, Table, Tag } from 'antd'
import ChannelTIDColumn from './ChannelTIDColumn'
import UsernameColumn from './UsernameColunm'
import PhotoColumn from './PhotoColumn'
import AboutColumn from './AboutColumn'
import { localFTime } from '@renderer/utils/tools'

export default function ChannelTable({
    channels,
    pagination,
    onChange,
    selectedRowKeys,
    onSelectChange
}) {
    const columns = [
        { title: '编号', dataIndex: 'id' },
        { title: '名称', dataIndex: 'title' },
        { title: '语言', dataIndex: 'lang' },
        {
            title: '频道ID',
            dataIndex: 'tid',
            render: (_, record) => <ChannelTIDColumn record={record} />
        },
        {
            title: 'username',
            dataIndex: 'username',
            render: (_, record) => <UsernameColumn record={record} />
        },
        { title: '链接', dataIndex: 'link', render: (value) => value || '-' },
        {
            title: '简介',
            dataIndex: 'about',
            render: (_, record) => <AboutColumn record={record} />
        },
        {
            title: '头像',
            dataIndex: 'photo',
            render: (_, record) => <PhotoColumn record={record} />
        },
        { title: '主链接', dataIndex: 'primary_links' },
        {
            title: '是否绑定任务',
            dataIndex: 'in_use',
            render: (value) =>
                value ? <Tag color="#e74c3c">是</Tag> : <Tag color="#3498db">否</Tag>
        },
        { title: '创建时间', dataIndex: 'created_at', render: (value) => localFTime(value) },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            // render: (_, record) => (
            //     <>
            //         <Button size="small">测试</Button>
            //     </>
            // )
        }
    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            {
                key: 'ALL',
                text: '全选',
                onSelect: (changeableRowKeys) => {
                    onSelectChange(changeableRowKeys)
                }
            },
            {
                key: 'NONE',
                text: '全不选',
                onSelect: () => {
                    onSelectChange([])
                }
            },
            {
                key: 'INVERT',
                text: '反选',
                onSelect: (changeableRowKeys) => {
                    const invertedRowKeys = changeableRowKeys.filter(
                        (item) => !selectedRowKeys.includes(item)
                    )
                    onSelectChange(invertedRowKeys)
                }
            },
            {
                key: 'U_UNSET',
                text: '选择未设置username',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = channels
                        .filter((item) => item.u_status === 1)
                        .map((item) => item.id)
                    onSelectChange(newSelectedRowKeys)
                }
            }
        ]
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={channels}
                rowKey="id"
                bordered
                pagination={pagination.pgProps}
                onChange={onChange}
                rowSelection={rowSelection}
                scroll={{ x: 'max-content' }}
            />
        </>
    )
}
