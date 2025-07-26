import { useState, useMemo } from 'react'
import { Form } from 'antd'
import AccountArgsForm from '../components/forms/AccountArgsForm'
import ChannelArgsForm from '../components/forms/ChannelArgsForm'
import PostArgsForm from '../components/forms/PostArgsForm'

const componentMap = {
    account: AccountArgsForm,
    channel: ChannelArgsForm,
    post: PostArgsForm
}

const taskTypes = [
    { label: '导入账号', value: 'account', disabled: true },
    { label: '批量创建频道', value: 'channel' },
    { label: '批量发布内容', value: 'post' }
]

export default function useCreateTaskForm() {
    const [form] = Form.useForm()
    const [taskType, setTaskType] = useState('')

    function handleTypeChange(newType) {
        setTaskType(newType)
        form.setFieldValue('args', [])
    }

    const DynamicFormComponent = useMemo(() => componentMap[taskType] || null, [taskType])

    return {
        taskTypes,
        form,
        DynamicFormComponent,
        handleTypeChange
    }
}
