import { use, useState } from 'react'
import { Form, Input, Space, Button } from 'antd'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function LoginForm() {
    const [form] = Form.useForm()
    const [pch, setPch] = useState('')

    const [codeLoading, setCodeLoading] = useState(false)
    async function sendCode() {
        const phone = form.getFieldValue('phone')
        if (!phone) {
            messageApi.error('请先填写电话号码')
            return
        }
        setCodeLoading(true)
        try {
            const res = await api.post('/accounts/login/start', { phone })
            if (res.code === 200) {
                setPch(res.data.phone_code_hash)
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (err) {
            messageApi.error('网络错误')
        } finally {
            setCodeLoading(false)
        }
    }

    const [loginLoading, setLoginLoading] = useState(false)
    async function handleFinish(values) {
        const payload = { ...values, phone_code_hash: pch }
        setLoginLoading(true)
        try {
            const res = await api.post('/accounts/login/complete', payload)
            if (res.code === 200) {
                form.resetFields()
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (err) {
            messageApi.error('网络错误')
        } finally {
            setLoginLoading(false)
        }
    }

    return (
        <Form
            form={form}
            initialValues={{ phone: '', code: '', password: '' }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="电话号码"
                name="phone"
                rules={[{ required: true, message: '电话号码不能为空' }]}
            >
                <Input placeholder="请输入电话号码 例如: +12345678909" />
            </Form.Item>
            <Form.Item
                label="验证码"
                name="code"
                rules={[{ required: true, message: '验证码不能为空' }]}
            >
                <Space>
                    <Input placeholder="请输入验证码" />
                    <Button onClick={sendCode} loading={codeLoading}>
                        获取验证码
                    </Button>
                </Space>
            </Form.Item>
            <Form.Item label="2FA密码" name="password">
                <Input placeholder="如果设置了2FA密码, 请务必填写" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loginLoading}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}
