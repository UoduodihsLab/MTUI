import { Form, Input, Select, Button } from 'antd'
import useCreateTaskForm from '../../hooks/useCreateTaskForm'
import api from '../../../../api/http'

import { messageApi } from '../../../../utils/MessageHolder'

export default function CreateTaskForm({ updateTasks, closeModal }) {
    const { taskTypes, form, DynamicFormComponent, handleTypeChange } = useCreateTaskForm()

    async function onFinish(values) {
        try {
            const result = await api.post('/tasks', values)

            if (result.code === 201) {
                messageApi.success(result.message)
                updateTasks()
                closeModal()
            } else {
                messageApi.error(result.message)
            }
        } catch (error) {
            messageApi.error(error)
        }
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

            {DynamicFormComponent && <DynamicFormComponent form={form} />}

            <Form.Item>
                <div className="flex justify-end">
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}
