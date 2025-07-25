import React, { createContext, useContext, useState, useEffect } from 'react'

const UpdaterContext = createContext()

export function UpdaterProvider({ children }) {
    const [updateInfo, setUpdateInfo] = useState({
        status: 'idle',
        message: '空闲',
        progress: null
    })

    useEffect(() => {
        const cleanup = window.electronAPI.onUpdateMessage((payload) => {
            setUpdateInfo({
                status: payload.status,
                message: payload.message,
                progress: payload.progress || null
            })
        })

        return cleanup
    }, [])

    const actions = {
        checkForUpdates: () => window.electronAPI.checkForUpdates(),
        startDownload: () => window.electronAPI.startDownload(),
        quitAndInstall: () => window.electronAPI.quitAndInstall()
    }

    const value = { updateInfo, actions }

    return <UpdaterContext value={value}>{children}</UpdaterContext>
}

export function useUpdater() {
    const context = useContext(UpdaterContext)
    if (!context) {
        throw new Error('useUpdater must be used within an UpdaterProvider')
    }

    return context
}
