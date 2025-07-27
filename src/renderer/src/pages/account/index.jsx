import { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import api from '@renderer/api/http'
import usePagination from '@renderer/hooks/usePagination'
import { localFTime } from '@renderer/utils/tools'
import useTModal from '@renderer/hooks/useTModal'

import PageView from '@renderer/components/PageView'

import LoginForm from './LoginForm'

export default function Account() {
    const [accounts, setAccounts] = useState([])
    const pagination = usePagination()

    const columns = [
        { title: '编号', dataIndex: 'id' },
        { title: '名称', dataIndex: 'phone', ellipsis: true },
        // { title: '路径', dataIndex: 'path', ellipsis: true },
        {
            title: '冻结',
            dataIndex: 'is_banned',
            render: (value) => (value ? '是' : '否')
        },
        {
            title: '临时',
            dataIndex: 'is_tmp',
            render: (value) => (value ? '是' : '否')
        },
        {
            title: '限制时间',
            dataIndex: 'limited_until',
            render: (value) => (value ? localFTime(value) : '-')
        },
        { title: '频道数量', dataIndex: 'channels_count' },
        {
            title: '上次使用',
            dataIndex: 'last_used_at',
            render: (value) => localFTime(value)
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            render: (_, record) => (
                <>
                    <Button type="primary" size="small">
                        临时客户端
                    </Button>
                </>
            )
        }
    ]

    async function getAccounts(page = 1, size = 10) {
        try {
            const res = await api.get(`/accounts?page=${page}&size=${size}`)
            if (res.code === 200) {
                const data = res.data.accounts
                setAccounts(data)
                pagination.update(page, size, res.data.count)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAccounts()
    }, [])

    function handleTableChange(newPagination) {
        getAccounts(newPagination.current, newPagination.pageSize)
    }

    const loginModal = useTModal()

    return (
        <PageView>
            <div>
                <Button onClick={loginModal.openModal}>账号登录</Button>
            </div>
            <div className="mt-[12px]">
                <Table
                    columns={columns}
                    dataSource={accounts}
                    rowKey="id"
                    bordered
                    scroll={{ x: 'max-content' }}
                    pagination={pagination.pgProps}
                    onChange={handleTableChange}
                />
            </div>

            <Modal title="登录Telegram账号" {...loginModal.modalProps} footer={null}>
                <LoginForm updateAccounts={getAccounts} />
            </Modal>
        </PageView>
    )
}
