import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import windowManager from './app-window'
import setupIPCHandlers from './ipc-handlers'
import startCore from './core'

app.whenReady().then(() => {
    const mainWindow = windowManager.createWindow()

    setupIPCHandlers()

    if (import.meta.env.PROD) {
        startCore
    }

    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
