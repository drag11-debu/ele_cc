const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('elect', {
	IpcRendererSend: async (msg, arg) => await ipcRenderer.invoke(msg, arg),
	on:              (channel, callback) => ipcRenderer.on(channel, (event, argv) => callback(event, argv))
});