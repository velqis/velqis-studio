const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  store: {
    get: (key, defaultValue) => ipcRenderer.invoke('get-store-value', key, defaultValue),
    set: (key, value) => ipcRenderer.invoke('set-store-value', key, value)
  },
  
  dialog: {
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    saveFile: (defaultPath, filters) => ipcRenderer.invoke('save-file', defaultPath, filters),
    showError: (title, content) => ipcRenderer.invoke('show-error-dialog', title, content),
    showInfo: (title, message, detail) => ipcRenderer.invoke('show-info-dialog', title, message, detail)
  },
  
  menu: {
    onOpenSettings: (callback) => ipcRenderer.on('open-settings', callback),
    onNewProject: (callback) => ipcRenderer.on('new-project', callback),
    onExportProject: (callback) => ipcRenderer.on('export-project', callback),
    onSwitchTool: (callback) => ipcRenderer.on('switch-tool', callback)
  },
  
  platform: process.platform,
  
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
}); 