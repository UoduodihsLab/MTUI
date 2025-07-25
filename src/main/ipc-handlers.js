import { ipcMain, dialog } from 'electron'
import updater from './updater-service'

export default function setupIPCHandlers() {
    ipcMain.handle('select-path', async (e, options) => {
        const result = await dialog.showOpenDialog(options)
        if (result.canceled) {
            return null
        }
        return result.filePaths[0]
    })

    ipcMain.on('check-for-updates', () => {
        console.log('点击检查更新')
        updater.checkForUpdates()
    })

    ipcMain.on('start-download-update', () => {
        updater.startDownloadUpdate()
    })

    ipcMain.on('quit-and-install', () => {
        updater.quitAndInstall()
    })
}
