import { useState, useMemo } from 'react'
import { Form } from 'antd'
import ChannelArgsForm from '../components/forms/ChannelArgsForm'

const componentMap = {
    create_channel: ChannelArgsForm,
}

const taskTypes = [
    { label: '批量创建频道', value: 'create_channel' },
]

export default function useCreateTaskForm() {
    const [form] = Form.useForm()
    const [taskType, setTaskType] = useState('')

    function handleTypeChange(newType) {
        setTaskType(newType)
        form.setFieldValue('args', {})
    }

    const DynamicFormComponent = useMemo(() => componentMap[taskType] || null, [taskType])

    return {
        taskTypes,
        form,
        DynamicFormComponent,
        handleTypeChange
    }
}
