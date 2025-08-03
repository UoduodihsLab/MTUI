import { useState } from 'react'
import { Form, Input, Button } from 'antd'

import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'

export default function SetPhotoForm({ selectedRowKeys, getChannels, pagination }) {
    const [form] = Form.useForm()

    async function selectPhotoDir() {
        const selectedDir = await window.electronAPI.selectPath({
            title: '请选择头像目录',
            buttonLabel: '确认',
            properties: ['openDirectory']
        })
        form.setFieldValue('photo_dir', selectedDir)
    }
    async function onFinish(values) {
        try {
            const payload = { ...values, channel_ids: selectedRowKeys }
            const res = await api.post('/channels/photos', payload)
            if (res.code === 200) {
                getChannels(pagination.page, pagination.size)
                form.resetFields()
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            console.error(error)
            messageApi.error('网络错误')
        }
    }
    return (
        <>
            <Form form={form} onFinish={onFinish} initialValues={{ photo_dir: '' }}>
                <Form.Item label="头像目录" name="photo_dir">
                    <Input onClick={selectPhotoDir} readOnly placeholder="点击选择头像目录" />
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            开始设置
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
