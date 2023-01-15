import {app, BrowserWindow, ipcMain } from 'electron'

const windowAbout = (window) => {
	let about = null

	  	about = new BrowserWindow({
			height: 250,
			width: 250,
			parent: window,
			fullscreenable: false,
			alwaysOnTop: true,
			autoHideMenuBar: true,
			titleBarStyle: 'hidden',
			frame: false,
			resizable: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false
		}
	})

	//console.log(about.id)
	//BrowserWindow.fromId(id)

	about.webContents.openDevTools() 
	about.loadFile('renderer/index.html')

	ipcMain.on('quit', (_, data) => {
			about.hide()
	})

	about.on('close', (e) => {
		e.preventDefault()
    about.hide()
  });
	
}

export default windowAbout