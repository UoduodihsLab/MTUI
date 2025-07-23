import { useState, useEffect } from 'react'
import { Form, Select, InputNumber, Input, TimePicker, message } from 'antd'

import api from '../../../../api/http'

export default function PostArgsForm() {
    const [channels, setChannels] = useState([])

    async function getChannels() {
        try {
            const result = await api.get(`/channels?in_use=false`)
            const data = result.data.map((item) => ({ label: item.title, value: item.id }))
            setChannels(data)
        } catch (error) {
            message.error('获取频道列表失败')
        }
    }

    useEffect(() => {
        getChannels()
    }, [])

    return (
        <>
            <Form.Item
                label="频道列表"
                name={['args', 0]}
                rules={[{ required: true, message: '请至少选择一个频道' }]}
            >
                <Select options={channels} placeholder="请选择需要发布内容的频道" />
            </Form.Item>
            <Form.Item
                label="内容数量"
                name={['args', 1]}
                rules={[{ required: true, message: '内容数量不能为空' }]}
            >
                <InputNumber placeholder="请输入每个频道需要发布的内容数量" className="w-full" />
            </Form.Item>
            <Form.Item
                label="AI提示词"
                name={['args', 2]}
                rules={[{ required: true, message: '提示词不能为空' }]}
            >
                <Input placeholder="请输入用于生成发布内容的AI提示词" />
            </Form.Item>
            <Form.Item
                label="发布起始时间"
                name={['args', 3]}
                rules={[{ required: true, message: '发布起始时间不能为空' }]}
            >
                <TimePicker format="HH:mm:ss" placeholder="选择起始时间" className="w-full" />
            </Form.Item>
        </>
    )
}
