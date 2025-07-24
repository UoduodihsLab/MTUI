import { useState } from 'react'

export default function useTModal() {
    const [visible, setVisible] = useState(false)

    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    const modalProps = {
        open: visible,
        onOk: closeModal,
        onCancel: closeModal
    }

    return {
        visible,
        openModal,
        closeModal,
        modalProps
    }
}
