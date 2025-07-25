import { is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import { getMainWindow } from './app-window'

if (is.dev) {
    autoUpdater.forceDevUpdateConfig = true
}
autoUpdater.autoDownload = false

function sendUpdateMessage(channel, payload) {
    const win = getMainWindow()
    if (win) {
        win.webContents.send(channel, payload)
    }
}

function checkForUpdates() {
    autoUpdater.on('checking-for-update', () => {
        sendUpdateMessage('update-message', { status: 'checking', message: '正在检查更新...' })
    })

    autoUpdater.on('update-available', (info) => {
        sendUpdateMessage('update-message', {
            status: 'available',
            message: `发现新版本, ${info.version}, 是否立即下载?`,
            info: info
        })
    })

    autoUpdater.on('update-not-available', (info) => {
        sendUpdateMessage('update-message', {
            status: 'not-available',
            message: '当前已是最新版本'
        })
    })

    autoUpdater.on('error', (err) => {
        sendUpdateMessage('update-message', {
            status: 'error',
            message: `更新出错: ${err.message}`
        })
    })

    autoUpdater.on('download-progress', (progressObj) => {
        sendUpdateMessage('update-message', {
            status: 'downloading',
            message: `正在下载... ${Math.floor(progressObj.percent)}`,
            progress: progressObj
        })
    })

    autoUpdater.on('update-downloaded', (info) => {
        sendUpdateMessage('update-message', {
            status: 'downloaded',
            message: `版本 ${info.version} 已下载完毕, 重启应用以安装`
        })
    })

    autoUpdater.checkForUpdatesAndNotify()
}

function startDownloadUpdate() {
    autoUpdater.downloadUpdate()
}

function quitAndInstall() {
    autoUpdater.quitAndInstall()
}

export default {
    checkForUpdates,
    startDownloadUpdate,
    quitAndInstall
}
