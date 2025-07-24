import { useState, useEffect } from 'react'
import { Table } from 'antd'
import api from '../../../api/http'

export default function LangTable() {
    const [langs, setLangs] = useState([])

    async function getLangs(page = 1, size = 10) {
        try {
            const result = await api.get(`/langs?page=${page}&size=${size}`)
            const data = result.data.langs
            setLangs(data)
        } catch (error) {
            console.error(error)
        }
    }

    const columns = [
        { title: '名称', dataIndex: 'title' },
        { title: '代码', dataIndex: 'code' }
    ]

    useEffect(() => {
        getLangs()
    }, [])
    return (
        <>
            <Table columns={columns} dataSource={langs} rowKey="id" bordered />
        </>
    )
}
