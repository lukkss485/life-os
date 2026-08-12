const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendAction: (action) => ipcRenderer.send('window-action', action)
});