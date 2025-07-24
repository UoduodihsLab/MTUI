import { Button, Modal } from 'antd'

import PageView from '../../components/PageView'
import BotTable from './components/BotTable'
import CreateBotForm from './components/CreateBotForm'
import useTModal from '../../hooks/useTModal'

export default function Bot() {
    const createModal = useTModal()
    return (
        <PageView>
            <div>
                <Button type="primary" onClick={createModal.openModal}>
                    添加机器人
                </Button>
            </div>
            <div className="mt-[12px]">
                <BotTable />
            </div>

            <div>
                <Modal title="添加机器人" {...createModal.modalProps}>
                    <CreateBotForm />
                </Modal>
            </div>
        </PageView>
    )
}
