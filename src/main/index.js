import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import windowManager from './app-window'
import setupIPCHandlers from './ipc-handlers'
import { ensureDatabaseExists, startCore } from './core'
import logger from './logger'

let coreProcess = null

app.whenReady().then(async () => {
    const mainWindow = windowManager.createWindow()
    logger.info('主窗口创建完毕')

    setupIPCHandlers()
    logger.info('ipc 模块初始化完毕')

    if (import.meta.env.PROD) {
        const userDatabasePath = await ensureDatabaseExists()
        coreProcess = startCore(userDatabasePath)
        logger.info('MTCore 加载完毕')
    }

    electronApp.setAppUserModelId('com.uoduodihs.mtdesktop')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (coreProcess) {
            coreProcess.kill()
            logger.info('MTCore 进程已退出')
        }
        app.quit()
    }
})

app.on('will-quit', () => {
    if (coreProcess) {
        coreProcess.kill()
        logger.info('MTCore 进程已退出')
    }
})
