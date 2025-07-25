import { Form, Input, Button } from 'antd'
import api from '../../../api/http'
import { messageApi } from '../../../utils/MessageHolder'

export default function CreateBotForm({ closeModal, updateBots }) {
    const [form] = Form.useForm()

    async function onFinish(values) {
        console.log(values)
        try {
            const result = await api.post('/bots', values)
            if (result.code === 201) {
                messageApi.success(result.message)
                updateBots()
                closeModal()
            } else {
                messageApi.error(result.message)
            }
        } catch (error) {
            messageApi.error(error)
        }
    }

    return (
        <>
            <Form form={form} initialValues={{ username: '', token: '' }} onFinish={onFinish}>
                <Form.Item
                    label="username"
                    name="username"
                    rules={[{ required: true, message: 'username不能为空' }]}
                >
                    <Input placeholder="请输入机器人username" />
                </Form.Item>

                <Form.Item
                    label="token"
                    name="token"
                    rules={[{ required: true, message: 'token不能为空' }]}
                >
                    <Input placeholder="请输入机器人token" />
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
