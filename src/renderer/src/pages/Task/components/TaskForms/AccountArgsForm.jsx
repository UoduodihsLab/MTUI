import { Form, Input } from 'antd'

export default function AccountArgs() {
    return (
        <>
            <Form.Item
                label="账号目录"
                name={['args', 0]}
                rules={[{ required: true, message: '账号目录不能为空' }]}
            >
                <Input placeholder="请选择账号目录" />
            </Form.Item>
        </>
    )
}
