import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import api from '../../../../api/http'

import { messageApi } from '../../../../utils/MessageHolder'

export default function ChannelArgsForm() {
    const [languages, setLanguages] = useState([])
    const [bots, setBots] = useState([])

    async function getLanguages() {
        try {
            const result = await api.get('/langs')
            if (result.code === 200) {
                const data = result.data.map((item) => ({ label: item.title, value: item.code }))
                setLanguages(data)
            }
        } catch (error) {
            messageApi.error('获取语言列表失败')
        }
    }

    async function getBots() {
        try {
            const result = await api.get('/bots')
            if (result.code === 200) {
                const data = result.data.map((item) => ({ label: item.username, value: item.id }))
                setBots(data)
            }
        } catch (error) {
            messageApi.error('获取机器人列表失败')
        }
    }

    useEffect(() => {
        getLanguages()
        getBots()
    }, [])

    return (
        <>
            <Form.Item
                label="频道数量"
                name={['args', 0]}
                rules={[{ required: true, message: '频道数量不能为空' }]}
            >
                <InputNumber type="number" />
            </Form.Item>
            <Form.Item
                label="频道语言"
                name={['args', 1]}
                rules={[{ required: true, message: '频道语言不能为空' }]}
            >
                <Select options={languages} placeholder="选择频道语言" allowClear />
            </Form.Item>
            <Form.Item
                label="频道名称"
                name={['args', 2]}
                rules={[{ required: true, message: '频道名称不能为空' }]}
            >
                <Input placeholder="请输入频道名称" />
            </Form.Item>

            <Form.Item
                label="机器人"
                name={['args', 3]}
                rules={[{ required: true, message: '必须选择一个机器人作为频道管理员' }]}
            >
                <Select options={bots} placeholder="选择机器人作为频道管理员" allowClear />
            </Form.Item>
        </>
    )
}
