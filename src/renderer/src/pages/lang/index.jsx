import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import useTModal from '@renderer/hooks/useTModal'
import PageView from '@renderer/components/PageView'
import CreateLangForm from './components/CreateLangForm'
import LangTable from './components/LangTable'

import api from '@renderer/api/http'

export default function Language() {
    const createModal = useTModal()

    const [langs, setLangs] = useState([])

    async function getLangs(page = 1, size = 10) {
        try {
            const result = await api.get(`/langs?page=${page}&size=${size}`)
            const data = result.data.langs
            setLangs(data)
        } catch (error) {
            console.error(error)
        }
    }

    function updateLangs() {
        getLangs()
    }

    useEffect(() => {
        getLangs()
    }, [])

    return (
        <>
            <PageView>
                <div>
                    <Button onClick={createModal.openModal} type="primary">
                        添加语言
                    </Button>
                </div>

                <div className="mt-[12px]">
                    <LangTable langs={langs} />
                </div>

                <div>
                    <Modal title="添加语言" {...createModal.modalProps} footer={null}>
                        <CreateLangForm
                            closeModal={createModal.closeModal}
                            updateLangs={updateLangs}
                        />
                    </Modal>
                </div>
            </PageView>
        </>
    )
}
