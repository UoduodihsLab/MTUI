import { Form, Input, Select, Button } from 'antd'
import useCreateTaskForm from '../../hooks/useCreateTaskForm'

export default function CreateTaskForm() {
    const { taskTypes, form, DynamicFormComponent, handleTypeChange } = useCreateTaskForm()

    function onFinish(values) {
        console.log(values)
    }

    return (
        <Form form={form} initialValues={{ t_type: null, title: '', args: [] }} onFinish={onFinish}>
            <Form.Item
                label="任务类型"
                name="t_type"
                rules={[{ required: true, message: '任务类型不能为空' }]}
            >
                <Select
                    options={taskTypes}
                    placeholder="请选择任务类型"
                    onChange={handleTypeChange}
                    allowClear
                />
            </Form.Item>

            <Form.Item
                label="任务名称"
                name="title"
                rules={[{ required: true, message: '请输入任务名称' }]}
            >
                <Input placeholder="输入任务名称" />
            </Form.Item>

            {DynamicFormComponent && <DynamicFormComponent />}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
