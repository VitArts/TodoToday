import {app, BrowserWindow, ipcMain,  } from 'electron'
import theme from './change-theme'

const windowAbout = (window) => {
	let about = null

		about = new BrowserWindow({
			height: 250,
			width: 250,
			parent: window,
			fullscreenable: false,
			alwaysOnTop: true,
			title: 'О программе',
			show: false,
			autoHideMenuBar: true,
			titleBarStyle: 'hidden',
			titleBarOverlay: false,
			frame: false,
			resizable: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false
		}
	})

	//console.log(about.id)
	//BrowserWindow.fromId(id)

	//about.webContents.openDevTools() 
	about.loadFile('renderer/about.html')

	about.webContents.on('did-finish-load', () => {
		about.webContents.send('version', app.getVersion())
		about.webContents.send('name', app.getName())
	})

	theme(about, 'setBackgroundColor')

	ipcMain.on('quit', (_, data) => {
			about.hide()
	})

	about.on('close', (e) => {
		e.preventDefault()
    about.hide()
  });
	
}

export default windowAbout