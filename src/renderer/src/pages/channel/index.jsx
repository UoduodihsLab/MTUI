import { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import PageView from '@renderer/components/PageView'
import api from '@renderer/api/http'
import usePagination from '@renderer/hooks/usePagination'

export default function Channel() {
    const [channels, setChannels] = useState([])
    const pagination = usePagination()
    const columns = [
        { title: '编号', dataIndex: 'id' },
        { title: '频道ID', dataIndex: 'channel_tid' },
        {
            title: 'username',
            dataIndex: 'username',
            render: (value) => value || '-'
        },
        { title: '名称', dataIndex: 'title' },
        { title: '语言', dataIndex: 'language' },
        { title: '链接', dataIndex: 'link' },
        {
            title: '是否绑定任务',
            dataIndex: 'in_use',
            render: (value) =>
                value ? <Tag color="#e74c3c">是</Tag> : <Tag color="#3498db">否</Tag>
        }
    ]

    async function getChannels(page = 1, size = 10, in_use = null) {
        try {
            let queryStr = `/channels?page=${page}&size=${size}`
            if (in_use) url += `&in_use=${in_use}`

            const res = await api.get(queryStr)
            if (res.code === 200) {
                const data = res.data.channels
                setChannels(data)
                pagination.update(page, size, res.data.count)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getChannels()
    }, [])

    function handleTableChange(newPagination) {
        getChannels(newPagination.current, newPagination.pageSize)
    }
    return (
        <>
            <PageView>
                <Table
                    columns={columns}
                    dataSource={channels}
                    rowKey="id"
                    bordered
                    pagination={pagination.pgProps}
                    onChange={handleTableChange}
                />
            </PageView>
        </>
    )
}
