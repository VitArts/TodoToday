import { ipcMain } from 'electron'

const alwaysOnTop = (window) => {
	ipcMain.on('alwaysOnTop', (_, data) => {
		if (data) {
			window.setAlwaysOnTop(true)
		} else {
			window.setAlwaysOnTop(false)
		}
	})
}

export default alwaysOnTop