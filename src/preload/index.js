const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    selectPath: (options) => ipcRenderer.invoke('select-path', options),

    checkForUpdates: () => ipcRenderer.send('check-for-updates'),

    startDownload: () => ipcRenderer.send('start-download-update'),

    quitAndInstall: () => ipcRenderer.send('quit-and-install'),

    onUpdateMessage: (callback) => {
        const listener = (_event, payload) => callback(payload)

        ipcRenderer.on('update-message', listener)

        return () => {
            ipcRenderer.removeListener('update-message', listener)
        }
    }
})
