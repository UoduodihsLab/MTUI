import { Form, Input, Button } from 'antd'

import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

const { TextArea } = Input

export default function SetPrimaryLinks({ selectedRowKeys, getChannels, pagination }) {
    const [form] = Form.useForm()

    async function onFinish(values) {
        try {
            const primary_links = values.primary_links.split(',')
            const payload = { channel_ids: selectedRowKeys, primary_links }
            const res = await api.post('/channels/primary-links', payload)
            if (res.code === 200) {
                getChannels(pagination.page, pagination.size)
                form.resetFields()
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            console.error(error)
            messageApi.error('网络错误')
        }
    }

    return (
        <>
            <Form form={form} initialValues={{ primary_links: '' }} onFinish={onFinish}>
                <Form.Item
                    label="主链接"
                    name="primary_links"
                    rules={[{ required: true, message: '主链接不能为空' }]}
                >
                    <TextArea placeholder="输入主链接, 多个链接用逗号隔开" />
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            开始设置
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
