import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import windowManager from './app-window'
import setupIPCHandlers from './ipc-handlers'
import { ensureDatabaseExists, startCore } from './core'
import logger from './logger'
import { execSync } from 'child_process'

// 将 coreProcess 声明在顶部，以便在整个文件中访问
let coreProcess = null

// 将清理函数提取出来，便于复用和管理
const cleanup = () => {
    if (coreProcess) {
        logger.info('正在关闭MTCore子进程...')

        if (process.platform === 'win32') {
            try {
                execSync(`taskkill /pid ${coreProcess.pid} /f /t`)
                logger.info('MTCore 进程树已成功终止')
            } catch (error) {
                logger.error('使用 taskkill 终止进程失败:', error)
                coreProcess.kill('SIGKILL')
            }
        } else {
            coreProcess.kill('SIGKILL')
        }
        coreProcess = null
    }
}

app.whenReady().then(async () => {
    // createWindow 的逻辑保持不变
    windowManager.createWindow()
    logger.info('主窗口创建完毕')

    setupIPCHandlers()
    logger.info('ipc 模块初始化完毕')

    // 生产环境下启动核心后端服务
    if (import.meta.env.PROD) {
        const userDatabasePath = await ensureDatabaseExists()
        coreProcess = startCore(userDatabasePath)
        logger.info('MTCore 加载完毕')

        // (推荐) 监听子进程的退出事件，以便调试
        coreProcess.on('exit', (code, signal) => {
            logger.info(`MTCore 进程已退出，退出码: ${code}, 信号: ${signal}`)
        })
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
    cleanup()
})

// (可选但推荐) 处理主进程意外崩溃的情况
process.on('exit', () => {
    logger.info('Electron主进程正在退出，执行最后的清理。')
    cleanup()
})
