'use strict';
const { app, BrowserView, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs   = require('fs');
let win;
let view;
let lngHeightBackup = 0;
let idAutoBackupTimer = 0;
let sProcessDir = '';

function AutoBackup() {
	view.webContents.executeJavaScript("savedata: {Game.WriteSave(1)}", false).then(function(savedata) {
		let dt = new Date();
		let sFilename =
		dt.getFullYear() +
			(dt.getMonth() + 1).toString().padStart(2, '0') +
			(dt.getDate()).toString().padStart(2, '0') +
			(dt.getHours()).toString().padStart(2, '0') +
			(dt.getMinutes()).toString().padStart(2, '0') +
			(dt.getSeconds()).toString().padStart(2, '0');
		fs.writeFile(path.join(sProcessDir, 'AutoBackup_' + sFilename + '.txt'), savedata, (error) => {
			if (error != null) view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup error.', false);");
		})
	});
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('ready', () => {
	// Initialize
	sProcessDir = process.cwd();

	// Block ADs
	session.defaultSession.webRequest.onBeforeRequest({
		urls: ["*://*.googlesyndication.com/*", "*://www.google-analytics.com/*", "*://*.googleadservices.com/*", "*://www.googletagmanager.com/*", "*://*.doubleclick.net/*"]
	}, (details, callback) => {
		callback({ cancel: true });
	});

	// Open Window
	const lngWidth      = 1030;
	const lngHeight     = 700;
	const lngHeadHeight = 64 + 2;
	win = new BrowserWindow({
		width:	            lngWidth,
		height:	            lngHeight,
		title:              'Electronical Cookie Creator',
		useContentSize:     true,
		autoHideMenuBar:    true,
		maximizable:        true,
		minimizable:        false,
		enableRemoteModule: false,
		webPreferences: {
			nodeIntegration:  false,
			contextIsolation: false,
			preload:          path.join(__dirname, 'preload_main.js'),
		}
	});
	win.on('closed', () => {
		win = null;
	});
	win.loadURL('file://' + __dirname + '/index.html');

	// Open View
	view = new BrowserView({
		webPreferences: {
			nodeIntegration:  false
//			preload:          path.join(__dirname, 'preload_view.js'),
		}
	});
	win.setBrowserView(view);
	view.setBounds({
		x:	0,
		y:	lngHeadHeight,
		width:	lngWidth,
		height:	lngHeight - lngHeadHeight
	});
	view.setAutoResize({
		width:  true,
		height: true
	});
	view.webContents.loadURL('https://orteil.dashnet.org/cookieclicker/');
	view.webContents.on('did-finish-load', () => {
		const js = fs.readFileSync(path.join(__dirname, 'ele_cc.js')).toString();
		view.webContents.executeJavaScript(js);
	});

	// shortcut
	win.webContents.on('before-input-event', (event, input) => {
		if (input.control && ((input.key.toLowerCase() === 'o') || (input.key.toLowerCase() === 'r') || (input.key.toLowerCase() === 's') || (input.key.toLowerCase() === 'z'))) {
			win.webContents.setIgnoreMenuShortcuts(input.control && ((input.key.toLowerCase() === 'o') || (input.key.toLowerCase() === 'r') || (input.key.toLowerCase() === 's') || (input.key.toLowerCase() === 'z')));
		}
	});
//	view.webContents.on('before-input-event', (event, input) => {
//		if (input.control && input.key.toLowerCase() === 'r') {
//			view.webContents.reload();
//		}else if (input.control && input.key.toLowerCase() === 'z') {
//			win.webContents.executeJavaScript("if(document.getElementById('quick_data').value.length > 0) window.EleIpcRendererSend('QUICK_IMPORT', document.getElementById('quick_data').value);");
//		}
//	});

	// maximize
	var eventResize = () => {
		setTimeout(() => {
			let winsize = win.getContentSize();
			view.setBounds({
				x:	0,
				y:	lngHeadHeight,
				width:	winsize[0],
				height:	winsize[1] - lngHeadHeight
			});
		}, 10);
	}
	//win.on('maximize',          eventResize);
	//win.on('unmaximize',        eventResize);
	win.on('enter-full-screen', eventResize);
	win.on('leave-full-screen', eventResize);

	ipcMain.on('CLICK_COOKIE',  (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.TimerStart('BigCookie');" : "oEleCC.TimerStop('BigCookie');");
	});
	ipcMain.on('CLICK_GOLDEN',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Golden']       = " + onoff + ";"); });
	ipcMain.on('CLICK_SWITCH',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['GSwitch']      = " + onoff + ";"); });
	ipcMain.on('SELL_GODZAMOK',     (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['SellGodzamok'] = " + onoff + ";"); });
	ipcMain.on('CLICK_CAST',        (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.AutoCastStart();" : "oEleCC.AutoCastStop();");
	});
	ipcMain.on('BUY_EP',            (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['BuyEP']        = " + onoff + ";"); });
	ipcMain.on('BUY_Z',             (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoBuyZ']     = " + onoff + ";"); });
	ipcMain.on('CLICK_FORTUNE',     (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Fortune']      = " + onoff + ";"); });
	ipcMain.on('CLICK_DRAGON',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Dragon']       = " + onoff + ";"); });
	ipcMain.on('CLICK_WRINKLER',    (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Wrinkler']     = " + onoff + ";"); });
	ipcMain.on('CLICK_SUGAR',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['ReRollSugar']  = " + onoff + ";"); });
	ipcMain.on('AUTO_JUICER',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoJuicer']   = " + onoff + ";"); });
	ipcMain.on('CLICK_GARDENER',    (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.Flags['Gardener'] = true;" : "oEleCC.ClickGardenerStop();");
	});
	ipcMain.on('GARDEN_JUICER',     (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.GardenJuicerStart();" : "oEleCC.GardenJuicerStop();");
	});
	ipcMain.on('GARDEN_JUICER_TARGET', (event, target) => {
		view.webContents.executeJavaScript("oEleCC.GardenJuicerTargetChange('" + target + "');");
	});
	ipcMain.on('REROLL_GARDEN', (event, savedata) => {
		view.webContents.executeJavaScript("oEleCC.ReRollGardenStart('" + savedata + "');");
	});
	ipcMain.on('REROLL_G_ONCE', (event, savedata) => {
		view.webContents.executeJavaScript("oEleCC.ReRollGardenerOnce('" + savedata + "');");
	});
	ipcMain.on('QUICK_EXPORT', (event, _) => {
		view.webContents.executeJavaScript("savedata: {Game.WriteSave(1)}", false).then((savedata) => { event.sender.send('SAVEDATA_SET', savedata); });
	});
	ipcMain.on('QUICK_IMPORT', (event, savedata) => {
		view.webContents.executeJavaScript("Game.ImportSaveCode('" + savedata + "');");
	});
	ipcMain.on('WIN_SHRINK', (_) => {
		let aSize = win.getSize();
		lngHeightBackup = aSize[1];
		win.setSize(aSize[0], process.platform == 'linux' ? 120 : 160, false);
	});
	ipcMain.on('WIN_EXTEND', (_) => {
		if (lngHeightBackup > 0) {
			let aSize = win.getSize();
			win.setSize(aSize[0], lngHeightBackup, false);
			lngHeightBackup = 0;
		}
	});
	ipcMain.on('WIN_DEVTOOL', (_) => {
		if (view.webContents.isDevToolsOpened())
			view.webContents.closeDevTools();
		else
			view.webContents.openDevTools();
	});
	ipcMain.on('AUTO_BACKUP', (event, onoff) => {
		if (onoff) {
			if(idAutoBackupTimer == 0) {
				AutoBackup();
				idAutoBackupTimer = setInterval(AutoBackup, 1000 * 60 * 60);
				view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup started.', false);");
			}
		} else {
			if (idAutoBackupTimer > 0) {
				clearInterval(idAutoBackupTimer);
				idAutoBackupTimer = 0; 
				view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup stopped.', false);");
			}
		}
	});
	ipcMain.on('TEST', (_) => {
		view.webContents.executeJavaScript("oEleCC.EleCCTest();");
	});
	//win.webContents.openDevTools();
});
