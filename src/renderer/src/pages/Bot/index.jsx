import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'

import PageView from '../../components/PageView'
import BotTable from './components/BotTable'
import CreateBotForm from './components/CreateBotForm'
import useTModal from '../../hooks/useTModal'

import api from '@renderer/api/http'

export default function Bot() {
    const createModal = useTModal()

    const [bots, setBots] = useState([])

    async function getBots(page = 1, size = 10) {
        try {
            const result = await api.get(`/bots?page=1&size=10`)
            if (result.code === 200) {
                const data = result.data.bots
                setBots(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    function updateBots() {
        getBots()
    }

    useEffect(() => {
        getBots()
    }, [])

    return (
        <PageView>
            <div>
                <Button type="primary" onClick={createModal.openModal}>
                    添加机器人
                </Button>
            </div>
            <div className="mt-[12px]">
                <BotTable bots={bots} />
            </div>

            <div>
                <Modal title="添加机器人" {...createModal.modalProps} footer={null}>
                    <CreateBotForm closeModal={createModal.closeModal} updateBots={updateBots} />
                </Modal>
            </div>
        </PageView>
    )
}
