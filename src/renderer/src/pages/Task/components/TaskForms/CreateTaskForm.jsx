import { Form, Input, Select, Button } from 'antd'
import useCreateTaskForm from '../../hooks/useCreateTaskForm'

export default function CreateTaskForm() {
    const { taskTypes, form, DynamicFormComponent, handleTypeChange } = useCreateTaskForm()

    return (
        <Form form={form} initialValues={{ t_type: '', title: '', args: [] }}>
            <Form.Item
                label="任务类型"
                name="t_type"
                rules={[{ required: true, message: '请选择任务类型' }]}
            >
                <Select
                    onChange={handleTypeChange}
                    placeholder="选择任务类型"
                    allowClear
                    options={taskTypes}
                />
            </Form.Item>

            <Form.Item
                label="任务名称"
                name="title"
                rules={[{ required: true, message: '请输入任务名称' }]}
            >
                <Input placeholder='输入任务名称' />
            </Form.Item>

            {DynamicFormComponent && <DynamicFormComponent />}
        </Form>
    )
}
