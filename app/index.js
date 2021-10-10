'use strict';
const { app, BrowserView, BrowserWindow, ipcMain, session, shell } = require('electron');
const path = require('path');
const fs   = require('fs');
let win;
let view;
let nHeightBak   = 0;
let idMinTimer   = 0;
let nMinTimerCnt = 0;
let sProcessDir  = '';

let MinTimer = () => {
	// AutoLog
	if (nMinTimerCnt % 5 == 0) {
		view.webContents.executeJavaScript("sLog: { oEleCC.GetLog() }", false).then((sLog) => {
			if (sLog) {
				fs.appendFile(path.join(sProcessDir, 'log.txt'), sLog + '\r\n', (error, result) => {
					if (error) view.webContents.executeJavaScript("oEleCC.Notify('Auto-Log error.', false);");
				});
			}
		});
	}
	// AutoBackup
	if (nMinTimerCnt == 0) {
		view.webContents.executeJavaScript("savedata: { oEleCC.WriteSave() }", false).then((savedata) => {
			let dt = new Date();
			let sTime =
				 dt.getFullYear()                               +
				(dt.getMonth() + 1).toString().padStart(2, '0') +
				(dt.getDate()     ).toString().padStart(2, '0') +
				(dt.getHours()    ).toString().padStart(2, '0') +
				(dt.getMinutes()  ).toString().padStart(2, '0') +
				(dt.getSeconds()  ).toString().padStart(2, '0');
			fs.writeFile(path.join(sProcessDir, 'AutoBackup_' + sTime + '.txt'), savedata, (error, result) => {
				if (error) view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup error.', false);");
			});
		});
	}
	nMinTimerCnt = (nMinTimerCnt + 1) % 60;
}

//app.disableHardwareAcceleration();

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
	const lngWidth      = 1000;
	const lngSideWidth  = 150;
	const lngHeight     = 600;
	const lngHeadHeight = 32;
	win = new BrowserWindow({
		width:	            lngWidth + lngSideWidth,
		height:	            lngHeight,
		title:              'Electronical Cookie Creator',
		useContentSize:     true,
		autoHideMenuBar:    true,
		maximizable:        true,
		minimizable:        false,
		enableRemoteModule: false,
		webPreferences:     { preload: path.join(__dirname, 'preload_main.js') }
	});
	win.on('closed', () => {
		win = null;
	});
	win.loadURL('file://' + __dirname + '/index.html');
	win.webContents.on('new-window', (ev,url) => {
		ev.preventDefault();
		shell.openExternal(url);
	});

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
	view.webContents.on('new-window', (ev,url) => {
		ev.preventDefault();
		shell.openExternal(url);
	});
	view.webContents.on('did-finish-load', () => {
		view.webContents.executeJavaScript(fs.readFileSync(path.join(__dirname, 'ele_cc.js')).toString());
		// Change Cookies in bank font size
		// Hide topBar
		view.webContents.insertCSS('#cookies           { font-size: 12pt !important; } ' + 
		                           '#commentsText      { font-size:  8pt; } ' + 
		                           '#commentsTextBelow { font-size:  8pt; } ' + 
		                           '#bankBalance       { font-size: 10pt; } ');
//		                           '#topBar            { display: none; } ' + 
//		                           '#game              { top:     0 !important; } ');
		// Block ADs
		//view.webContents.insertCSS('#aqad              { display: none; }');
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
				width:	winsize[0] - lngSideWidth,
				height:	winsize[1] - lngHeadHeight
			});
		}, 10);
	}
	//win.on('maximize',          eventResize);
	//win.on('unmaximize',        eventResize);
	win.on('enter-full-screen', eventResize);
	win.on('leave-full-screen', eventResize);

	ipcMain.handle('CLICK_COOKIE',  (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.TimerStart('BigCookie');" : "oEleCC.TimerStop('BigCookie');");
	});
	ipcMain.handle('CLICK_GOLDEN',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Golden']       = " + onoff + ";"); });
	ipcMain.handle('CLICK_SWITCH',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['GSwitch']      = " + onoff + ";"); });
	ipcMain.handle('SELL_GODZAMOK',     (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['SellGodzamok'] = " + onoff + ";"); });
	ipcMain.handle('CLICK_CAST',        (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.AutoCastStart();" : "oEleCC.AutoCastStop();");
	});
	ipcMain.handle('AUTO_LOAN',         (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoLoan']     = " + onoff + ";"); });
	ipcMain.handle('AUTO_SUGAR',        (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoSugar']    = " + onoff + ";"); });
	ipcMain.handle('AUTO_REFILL',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoRefill']   = " + onoff + ";"); });
	ipcMain.handle('AUTO_WASTE',        (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoWaste']    = " + onoff + ";"); });
	ipcMain.handle('BUY_EP',            (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['BuyEP']        = " + onoff + ";"); });
	ipcMain.handle('BUY_A',             (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoBuyA']     = " + onoff + ";"); });
	ipcMain.handle('BUY_Z',             (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoBuyZ']     = " + onoff + ";"); });
	ipcMain.handle('CLICK_FORTUNE',     (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Fortune']      = " + onoff + ";"); });
	ipcMain.handle('CLICK_DRAGON',      (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Dragon']       = " + onoff + ";"); });
	ipcMain.handle('CLICK_WRINKLER',    (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['Wrinkler']     = " + onoff + ";"); });
	ipcMain.handle('CLICK_SUGAR',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['ReRollSugar']  = " + onoff + ";"); });
	ipcMain.handle('GET_CARAMEL',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['SugarCaramel'] = " + onoff + ";"); });
	ipcMain.handle('GET_GOLDEN',        (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['SugarGolden']  = " + onoff + ";"); });
	ipcMain.handle('AUTO_JUICER',       (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoJuicer']   = " + onoff + ";"); });
	ipcMain.handle('CLICK_GARDENER',    (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.Flags['Gardener'] = true;" : "oEleCC.ClickGardenerStop();");
	});
	ipcMain.handle('GARDEN_JUICER',     (event, onoff) => {
		view.webContents.executeJavaScript(onoff ? "oEleCC.GardenJuicerStart();" : "oEleCC.GardenJuicerStop();");
	});
	ipcMain.handle('GARDEN_JUICER_TARGET', (event, target) => {
		view.webContents.executeJavaScript("oEleCC.GardenJuicerTargetChange('" + target + "');");
	});
	ipcMain.handle('REROLL_GARDEN', (event, savedata) => {
		view.webContents.executeJavaScript("oEleCC.ReRollGardenStart('" + savedata + "');");
	});
	ipcMain.handle('REROLL_G_ONCE', (event, savedata) => {
		view.webContents.executeJavaScript("oEleCC.ReRollGardenerOnce('" + savedata + "');");
	});
	ipcMain.handle('AUTO_TRADE',        (event, onoff) => { view.webContents.executeJavaScript("oEleCC.Flags['AutoTrade']    = " + onoff + ";"); });
	ipcMain.handle('QUICK_EXPORT', (event, _) => {
		view.webContents.executeJavaScript("savedata: {oEleCC.WriteSave()}", false).then((savedata) => { event.sender.send('SAVEDATA_SET', savedata); });
	});
	ipcMain.handle('QUICK_IMPORT', (event, savedata) => {
		view.webContents.executeJavaScript("Game.ImportSaveCode('" + savedata + "');");
	});
	ipcMain.handle('WIN_SHRINK', (event, onoff) => {
		if (onoff) {
			let aSize = win.getSize();
			nHeightBak = aSize[1];
			win.setSize(aSize[0], process.platform == 'linux' ? 110 : 150, false);
		} else if (nHeightBak > 0) {
			let aSize = win.getSize();
			win.setSize(aSize[0], nHeightBak, false);
			nHeightBak = 0;
		}
	});
	ipcMain.handle('WIN_DEVTOOL', (_) => {
		if (view.webContents.isDevToolsOpened())
			view.webContents.closeDevTools();
		else
			view.webContents.openDevTools();
	});
	ipcMain.handle('AUTO_BACKUP', (event, onoff) => {
		if (onoff) {
			if(idMinTimer == 0) {
				MinTimer();
				idMinTimer = setInterval(MinTimer, 1000 * 60);
				view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup started.', false);");
			}
		} else {
			if (idMinTimer > 0) {
				clearInterval(idMinTimer);
				idMinTimer = 0; 
				view.webContents.executeJavaScript("oEleCC.Notify('Auto-Backup stopped.', false);");
			}
		}
	});
	ipcMain.handle('TEST', (_) => {
		view.webContents.executeJavaScript("oEleCC.EleCCTest();");
	});
	//win.webContents.openDevTools();
});
