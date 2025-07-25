import { app, shell, BrowserWindow, ipcMain, dialog, autoUpdater } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import path from ''
import { spawn, ChildProcess } from 'child_process'

import icon from '../../resources/icon.png?asset'

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 832,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            contextIsolation: true
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()

        if (import.meta.env.PROD) {
            autoUpdater.checkForUpdatesAndNotify()
        }
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

if (import.meta.env.PROD) {
    autoUpdater.on('update-available', (info) => {
        console.log('发现可用更新: ', info)
    })

    autoUpdater.on('update-downloaded', (info) => {
        console.log('更新下载完成', info)

        dialog
            .showMessageBox({
                type: 'info',
                buttons: ['重启安装', '稍后'],
                title: '应用更新',
                message: '新版本已下载, 重启应用即可完成安装'
            })
            .then((res) => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall()
                }
            })
    })

    autoUpdater.on('error', (err) => {
        console.log('更新出错', err)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC
    ipcMain.handle('select-path', async (e, options) => {
        const result = await dialog.showOpenDialog(options)
        if (result.canceled) {
            return null
        }
        return result.filePaths[0]
    })

    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
