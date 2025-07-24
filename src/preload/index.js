const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    selectPath: (options) => ipcRenderer.invoke('select-path', options)
})
