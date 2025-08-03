import { useState, useEffect } from 'react'
import { Form, Select, InputNumber, Input, Button } from 'antd'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

const { TextArea } = Input

export default function CreateChannelForm({ getChannels, pagination }) {
    const [form] = Form.useForm()

    const [accounts, setAccounts] = useState([])
    async function getAccounts() {
        try {
            const res = await api.get('/accounts')
            if (res.code === 200) {
                const data = res.data.accounts.map((account) => ({
                    label: account.session_name,
                    value: account.id
                }))
                setAccounts(data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getAccounts()
    }, [])

    const [loading, setLoading] = useState(false)
    async function onFinish(values) {
        const title_items = values.title_items
            .split('\n')
            .map((item) => ({ title: item.split(',')[0], lang: item.split(',')[1] }))

        const payload = { ...values, title_items }
        console.log(payload)

        setLoading(true)
        try {
            const res = await api.post('/channels', payload)
            if (res.code === 201) {
                getChannels(pagination.page, pagination.size)
                form.resetFields()
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ account_id: null, request_cunt: 0, title_items: '' }}
            >
                <Form.Item
                    label="选择账号"
                    name="account_id"
                    rules={[{ required: true, message: '必须选择一个账号用来创建频道' }]}
                >
                    <Select options={accounts} placeholder="选择作为频道创建者的账号" />
                </Form.Item>
                <Form.Item
                    label="创建数量"
                    name="request_count"
                    rules={[
                        { required: true, message: '必须输入频道数量' },
                        { type: 'number', max: 10, message: '每个账号最多创建10个频道' },
                        { type: 'number', min: 1, message: '至少创建1个频道' }
                    ]}
                >
                    <InputNumber placeholder="输入需要创建的频道数量" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="频道信息"
                    name="title_items"
                    rules={[{ required: true, message: '至少输入一条频道信息' }]}
                >
                    <TextArea placeholder="输入每个频道名称和语言, 中间用逗号隔开, 每条占一行, 格式: 频道名称,语言" />
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit" loading={loading}>
                            确认创建
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
