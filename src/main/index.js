import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import windowManager from './app-window'
import setupIPCHandlers from './ipc-handlers'
import { startCore, killCore } from './core'
import logger from './logger'

app.whenReady().then(async () => {
    // createWindow 的逻辑保持不变
    windowManager.createWindow()
    logger.info('主窗口创建完毕')

    setupIPCHandlers()
    logger.info('ipc 模块初始化完毕')

    // 生产环境下启动核心后端服务
    if (import.meta.env.PROD) {
        startCore()
    }

    electronApp.setAppUserModelId('com.uoduodihs.mtdesktop')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            windowManager.createWindow()
        }
    })
})

// 当所有窗口都关闭时
app.on('window-all-closed', () => {
    // 在非 macOS 平台上，关闭所有窗口时退出应用。
    // macOS 的标准行为是即使没有窗口，应用也保持活动状态。
    // 注意：我们已经将 coreProcess.kill() 的逻辑移除了。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 在应用即将退出时，执行最终的清理工作
// 这是清理子进程最可靠的地方
app.on('will-quit', (event) => {
    // 调用我们定义的清理函数
    killCore()
})

// (可选但推荐) 处理主进程意外崩溃的情况
process.on('exit', () => {
    logger.info('Electron主进程正在退出，执行最后的清理。')
    killCore()
})
