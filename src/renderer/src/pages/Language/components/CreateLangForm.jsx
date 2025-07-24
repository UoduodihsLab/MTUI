import { Form, Input, Button } from 'antd'
import api from '../../../api/http'
import { messageApi } from '../../../utils/MessageHolder'

export default function CreateLangForm() {
    const [form] = Form.useForm()

    async function onFinish(values) {
        console.log(values)
        try {
            const result = await api.post('/languages', values)
            if (result.code === 201) {
                messageApi.success(result.message)
            } else {
                messageApi.error(result.message)
            }
        } catch (error) {
            messageApi.error(error)
        }
    }

    return (
        <>
            <Form form={form} initialValues={{ title: '', code: '' }} onFinish={onFinish}>
                <Form.Item
                    label="语言名称"
                    name="title"
                    rules={[{ required: true, message: '语言名称不能为空' }]}
                >
                    <Input placeholder="请输入语言名称" />
                </Form.Item>
                <Form.Item
                    label="语言代码"
                    name="code"
                    rules={[{ required: true, message: '语言代码不能为空' }]}
                >
                    <Input placeholder="请输入语言代码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
