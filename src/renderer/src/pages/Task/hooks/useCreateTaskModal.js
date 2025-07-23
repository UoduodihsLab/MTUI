import { useState, useCallback } from 'react'

export default function useCreateTaskModal() {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const modalProps = {
        open: isOpen,
        onOk: closeModal,
        onCancel: closeModal
    }

    return {
        isOpen,
        openModal,
        closeModal,
        modalProps
    }
}
