import { Form, Input, Select, Button } from 'antd'
import PostMessageForm from './PostMessageForm'

import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

const FormItem = Form.Item

export default function CreateTaskForm({ getTasks, pagination }) {
    const [form] = Form.useForm()
    const t_type = Form.useWatch('t_type', form)

    const taskTypes = [
        { label: '同步频道', value: 1 },
        { label: '同步Username', value: 2 },
        { label: '同步简介', value: 3 },
        { label: '同步头像', value: 4 },
        { label: '发布内容', value: 5 },
        { label: '同步机器人为管理员', value: 6 }
    ]

    async function onFinish(values) {
        console.log(values)
        try {
            const res = await api.post('/tasks', values)
            if (res.code === 201) {
                await getTasks(pagination.page, pagination.size)
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
            <Form
                form={form}
                initialValues={{
                    t_type: null,
                    title: '',
                    args: {
                        channel_ids: [],
                        count_to_post: null,
                        ai_prompt: '',
                        attach_content: []
                    }
                }}
                onFinish={onFinish}
            >
                <FormItem
                    label="任务名称"
                    name="title"
                    rules={[{ required: true, message: '必须输入任务名称' }]}
                >
                    <Input placeholder="输入任务名称" />
                </FormItem>
                <FormItem
                    label="任务类型"
                    name="t_type"
                    rules={[{ required: true, message: '必须选择一个任务类型' }]}
                >
                    <Select options={taskTypes} placeholder="请选择任务类型" />
                </FormItem>
                {t_type === 5 && <PostMessageForm form={form} />}
                <FormItem>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            确认创建
                        </Button>
                    </div>
                </FormItem>
            </Form>
        </>
    )
}
