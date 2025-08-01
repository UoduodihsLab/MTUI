import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import api from '@renderer/api/http'

import { messageApi } from '@renderer/utils/MessageHolder'

const { TextArea } = Input

export default function ChannelArgsForm() {
    const [accounts, setAccounts] = useState([])

    async function getAccounts() {
        try {
            const res = await api.get('/accounts')
            if (res.code === 200) {
                const data = res.data.accounts.map((item) => ({
                    label: item.session_name,
                    value: item.id
                }))
                setAccounts(data)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }

    useEffect(() => {
        getAccounts()
    }, [])
    return (
        <>
            <Form.Item
                label="频道数量"
                name={['args', 'total']}
                rules={[
                    { required: true, message: '必须选择一个账号来创建频道' },
                    { type: 'number', max: 10, message: '每个账号最多创建10个频道' },
                    { type: 'number', min: 1, message: '至少创建一个频道' }
                ]}
            >
                <InputNumber
                    type="number"
                    placeholder="输入要创建的频道数量"
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                label="选择账号"
                name={['args', 'account_id']}
                rules={[{ required: true, message: '必须选择一个账号来创建频道' }]}
            >
                <Select options={accounts} placeholder="选择账号" allowClear />
            </Form.Item>
            <Form.Item
                label="初始信息"
                name={['args', 'title_items']}
                rules={[{ required: true, message: '初始信息不能为空' }]}
            >
                <TextArea placeholder="格式: 频道名称+空格+频道语言, 例如: ChannelTitle 英语, 每行一条" />
            </Form.Item>
        </>
    )
}
