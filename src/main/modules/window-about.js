import { BrowserWindow, ipcMain } from 'electron'

const windowAbout = (window) => {
	let about = null
	  	about = new BrowserWindow({
			height: 250,
			width: 250,
			parent: window,
			fullscreenable: true,
			alwaysOnTop: true,
			autoHideMenuBar: true,
			titleBarStyle: 'hidden',
			frame: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false
		}
	})

	about.webContents.openDevTools() 
	about.loadFile('renderer/index.html')

	ipcMain.on('quit', (_, data) => {
		if (data === 'quit') {
			about.hide()
		} 
	})
	
}

export default windowAbout