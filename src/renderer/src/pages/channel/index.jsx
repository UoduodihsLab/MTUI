import { useState, useEffect } from 'react'
import { Space, Button, Modal, Select, Input } from 'antd'
import PageView from '@renderer/components/PageView'
import ChannelTable from './ChannelTable'
import useTModal from '@renderer/hooks/useTModal'
import CreateChannelForm from './CreateChannelForm'
import api from '@renderer/api/http'
import { messageApi } from '@renderer/utils/MessageHolder'
import usePagination from '@renderer/hooks/usePagination'
import SetAboutForm from './SetAboutForm'
import SetPhotoForm from './SetPhotoForm'
import SetPrimaryLinksForm from './SetPrimaryLinksForm'

const { TextArea } = Input

export default function Channel() {
    const [channels, setChannels] = useState([])
    const pagination = usePagination()
    function handleTableChange(newPagination) {
        getChannels(newPagination.current, newPagination.pageSize)
    }

    async function getChannels(page, size) {
        try {
            let queryStr = `/channels?page=${pagination.page}&size=${pagination.size}`

            const res = await api.get(queryStr)
            if (res.code === 200) {
                const data = res.data.channels
                setChannels(data)
                pagination.update(page, size, res.data.count)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getChannels(pagination.page, pagination.size)
    }, [])

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    function handleRowSelectionChange(newSelectedRowKeys) {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    async function startSetUsernames() {
        try {
            const payload = { channel_ids: selectedRowKeys }
            const res = await api.post('/channels/usernames', payload)
            if (res.code === 200) {
                getChannels(pagination.page, pagination.size)
                messageApi.success(res.message)
            } else {
                messageApi.error(res.message)
            }
        } catch (error) {
            messageApi.error('网络错误')
        }
    }

    const modalToCreate = useTModal()
    const modalToSetAbout = useTModal()
    const modalToSetPhoto = useTModal()
    const modalToSetPrimaryLinks = useTModal()
    return (
        <>
            <PageView>
                <div>
                    <Space>
                        <Button type="primary" onClick={modalToCreate.openModal}>
                            批量创建频道
                        </Button>
                        <Button
                            onClick={startSetUsernames}
                            type="primary"
                            disabled={selectedRowKeys.length < 1}
                        >
                            自动生成 username
                        </Button>
                        <Button
                            onClick={modalToSetAbout.openModal}
                            disabled={selectedRowKeys.length < 1}
                        >
                            设置简介
                        </Button>
                        <Button
                            onClick={modalToSetPhoto.openModal}
                            disabled={selectedRowKeys.length < 1}
                        >
                            设置头像
                        </Button>
                        <Button
                            onClick={modalToSetPrimaryLinks.openModal}
                            disabled={selectedRowKeys.length < 1}
                        >
                            设置主链接
                        </Button>
                    </Space>
                </div>
                <div className="mt-[12px]">
                    <ChannelTable
                        channels={channels}
                        pagination={pagination}
                        onChange={handleTableChange}
                        selectedRowKeys={selectedRowKeys}
                        onSelectChange={handleRowSelectionChange}
                    />
                </div>
                <div>
                    <Modal title="批量创建频道" {...modalToCreate.modalProps} footer={null}>
                        <CreateChannelForm getChannels={getChannels} pagination={pagination} />
                    </Modal>
                    <Modal title="设置简介" {...modalToSetAbout.modalProps} footer={null}>
                        <SetAboutForm
                            selectedRowKeys={selectedRowKeys}
                            getChannels={getChannels}
                            pagination={pagination}
                        />
                    </Modal>
                    <Modal title="设置头像" {...modalToSetPhoto.modalProps} footer={null}>
                        <SetPhotoForm
                            selectedRowKeys={selectedRowKeys}
                            getChannels={getChannels}
                            pagination={pagination}
                        />
                    </Modal>
                    <Modal title="设置主链接" {...modalToSetPrimaryLinks.modalProps} footer={null}>
                        <SetPrimaryLinksForm
                            selectedRowKeys={selectedRowKeys}
                            getChannels={getChannels}
                            pagination={pagination}
                        />
                    </Modal>
                </div>
            </PageView>
        </>
    )
}
