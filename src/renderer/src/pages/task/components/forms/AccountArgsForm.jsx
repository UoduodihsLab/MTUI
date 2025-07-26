import { Form, Input } from 'antd'

export default function AccountArgs({ form }) {
    async function selectSessionsDir() {
        const options = {
            title: '选择账号目录',
            buttonLabel: '选择此目录',
            properties: ['openDirectory']
        }

        const result = await window.electronAPI.selectPath(options)

        console.log(result)
        if (result) {
            form.setFieldsValue({
                args: [result]
            })
        }
    }

    return (
        <>
            <Form.Item
                label="账号目录"
                name={['args', 0]}
                rules={[{ required: true, message: '账号目录不能为空' }]}
            >
                <Input
                    onClick={selectSessionsDir}
                    className="cursor-pointer"
                    placeholder="请选择账号目录"
                    readOnly
                />
            </Form.Item>
        </>
    )
}
