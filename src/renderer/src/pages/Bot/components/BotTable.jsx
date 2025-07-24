import { useEffect, useState } from 'react'
import { Table, Space, Button } from 'antd'

import api from '../../../api/http'
import { messageApi } from '../../../utils/MessageHolder'

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

export default function BotTable() {
    const [bots, setBots] = useState([])

    async function getBots(page = 1, size = 10) {
        try {
            const result = await api.get(`/bots?page=1&size=10`)
            if (result.code === 200) {
                const data = result.data.bots
                setBots(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBots()
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={bots} rowKey="id" bordered />
        </>
    )
}
