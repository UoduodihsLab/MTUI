import { useState, useEffect } from 'react'
import { Form, Select, Input, InputNumber, Checkbox } from 'antd'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

const FormItem = Form.Item
const { TextArea } = Input

export default function PostMessageForm({ form }) {
    const [channelOptions, setChannelOptions] = useState([])
    const attachContentOptions = [
        { label: '图片', value: 'photo' },
        { label: '视频', value: 'video' },
        { label: '主链接', value: 'primary_links' }
    ]

    async function getChannels() {
        try {
            const res = await api.get('/tasks/channels')
            if (res.code === 200) {
                const data = res.data.channels.map((item) => ({
                    label: item.title,
                    value: item.id,
                    disabled: item.in_use || item.c_status === 1
                }))
                setChannelOptions(data)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }

    useEffect(() => {
        getChannels()
    }, [])

    async function selectPhotoDir() {
        const selectedDir = await window.electronAPI.selectPath({
            title: '请选择图片目录',
            buttonLabel: '确认',
            properties: ['openDirectory']
        })
        form.setFieldValue(['args', 'photo_dir'], selectedDir)
    }

    async function selectVideoDir() {
        const selectedDir = await window.electronAPI.selectPath({
            title: '请选择视频目录',
            buttonLabel: '确认',
            properties: ['openDirectory']
        })
        form.setFieldValue(['args', 'video_dir'], selectedDir)
    }

    return (
        <>
            <FormItem
                label="选择频道"
                name={['args', 'channel_ids']}
                rules={[{ required: true, message: '至少选择一个频道' }]}
            >
                <Select
                    options={channelOptions}
                    placeholder="请选择需要定时发送消息的频道"
                    mode="multiple"
                />
            </FormItem>
            <FormItem
                label="内容数量"
                name={['args', 'count_to_post']}
                rules={[
                    { required: true, message: '必须输入内容数量' },
                    { type: 'number', min: 1, message: '内容数量至少为1' },
                    { type: 'number', max: 10, message: '内容数量最多为10' }
                ]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="请输入每日发布的内容数量" />
            </FormItem>
            <FormItem
                label="AI提示词"
                name={['args', 'ai_prompt']}
                rules={[{ required: true, message: '必须输入ai提示词' }]}
            >
                <TextArea placeholder="请输入用于发布内容的AI提示词" />
            </FormItem>
            <FormItem
                label="每条内容最大字数"
                name={['args', 'word_count_range', 'max_count']}
                rules={[
                    { required: true, message: '必须输入最大字数' },
                    { type: 'number', max: 200, message: '字数最多200' },
                    { type: 'number', max: 10, message: '字数最低10' }
                ]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="请输入每条内容的最大字数" />
            </FormItem>
            <FormItem
                label="每条内容最少字数"
                name={['args', 'word_count_range', 'min_count']}
                rules={[
                    { required: true, message: '必须输入最少字数' },
                    { type: 'number', max: 200, message: '字数最多200' },
                    { type: 'number', max: 10, message: '字数最低10' }
                ]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="请输入每条内容的最小字数" />
            </FormItem>
            <FormItem label="附加内容" name={['args', 'attach_content']}>
                <Checkbox.Group options={attachContentOptions} />
            </FormItem>
            <FormItem
                label="图片目录"
                name={['args', 'photo_dir']}
                rules={[{ required: true, message: '必须选择图片目录' }]}
            >
                <Input onClick={selectPhotoDir} placeholder="点击选择图片目录" readOnly />
            </FormItem>
            <FormItem
                label="视频目录"
                name={['args', 'video_dir']}
                rules={[{ required: true, message: '必须选择视频目录' }]}
            >
                <Input onClick={selectVideoDir} placeholder="点击选择视频目录" readOnly />
            </FormItem>
        </>
    )
}
