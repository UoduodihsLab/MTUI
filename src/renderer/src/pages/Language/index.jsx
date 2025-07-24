import { Button, Modal } from 'antd'
import useTModal from '../../hooks/useTModal'
import PageView from '../../components/PageView'
import CreateLangForm from './components/CreateLangForm'
import LangTable from './components/LangTable'

export default function Language() {
    const createModal = useTModal()
    return (
        <>
            <PageView>
                <div>
                    <Button onClick={createModal.openModal} type="primary">
                        添加语言
                    </Button>
                </div>

                <div className="mt-[12px]">
                    <LangTable />
                </div>

                <div>
                    <Modal title="添加语言" {...createModal.modalProps}>
                        <CreateLangForm />
                    </Modal>
                </div>
            </PageView>
        </>
    )
}
