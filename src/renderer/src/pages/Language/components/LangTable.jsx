import { useState, useEffect } from 'react'
import { Table } from 'antd'
import api from '../../../api/http'

export default function LangTable({ langs }) {
    const columns = [
        { title: '名称', dataIndex: 'title' },
        { title: '代码', dataIndex: 'code' }
    ]
    return <Table columns={columns} dataSource={langs} rowKey="id" bordered />
}
