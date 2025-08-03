import { Form, Input, Button } from 'antd'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

const { TextArea } = Input

export default function SetAboutForm({ selectedRowKeys, getChannels, pagination }) {
    const [form] = Form.useForm()

    async function onFinish(values) {
        try {
            const payload = { ...values, channel_ids: selectedRowKeys }
            const res = await api.post('/channels/abouts', payload)
            if (res.code === 200) {
                getChannels(pagination.page, pagination.size)
                form.resetFields()
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }
    return (
        <>
            <Form form={form} onFinish={onFinish} initialValues={{about: ''}}>
                <Form.Item
                    label="简介内容"
                    name="about"
                    rules={[{ required: true, message: '简介内容不能为空' }]}
                >
                    <TextArea placeholder="请输入简介内容" />
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
