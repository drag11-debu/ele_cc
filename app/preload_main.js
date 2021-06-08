const { ipcRenderer } = require('electron');
window.EleIpcRendererSend = (msg, arg) => {
	ipcRenderer.send(msg, arg);
};
ipcRenderer.on('SAVEDATA_SET',  (event, savedata) => { document.getElementById('quick_data').value = savedata; });
