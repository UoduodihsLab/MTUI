import { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import api from '@renderer/api/http'
import { localFTime } from '@renderer/utils/tools'

import PageView from '../../components/PageView'
export default function Account() {
    const [accounts, setAccounts] = useState([])
    const columns = [
        { title: '编号', dataIndex: 'id' },
        { title: '名称', dataIndex: 'phone', ellipsis: true },
        { title: '路径', dataIndex: 'path', ellipsis: true },
        {
            title: '冻结',
            dataIndex: 'is_banned',
            render: (value) => (value === 1 ? '是' : '否')
        },
        {
            title: '临时',
            dataIndex: 'is_tmp',
            render: (value) => (value === 1 ? '是' : '否')
        },
        {
            title: '限制时间',
            dataIndex: 'limited_until',
            render: (value) => (value ? localFTime(value) : '-')
        },
        { title: '频道数量', dataIndex: 'channels_count' },
        {
            title: '上次使用',
            dataIndex: 'last_used_at',
            render: (value) => localFTime(value)
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            render: (_, record) => (
                <>
                    <Button type="primary" size="small">
                        临时客户端
                    </Button>
                </>
            )
        }
    ]

    async function getAccounts(page = 1, size = 10) {
        try {
            const res = await api.get(`/accounts?page=${page}&size=${size}`)
            if (res.code === 200) {
                const data = res.data.accounts
                setAccounts(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAccounts()
    })
    return (
        <>
            <PageView>
                <Table
                    columns={columns}
                    dataSource={accounts}
                    rowKey="id"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </PageView>
        </>
    )
}
