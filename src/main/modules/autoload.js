import { app } from 'electron'
import { ipcMain } from 'electron'

const autoLoad = () => {
	ipcMain.on('autoLoad', (_, data) => {
		if (data) {
			app.setLoginItemSettings({
				openAtLogin: true,
			})
		} else {
			app.setLoginItemSettings({
				openAtLogin: false,
			})
		}
	})
}

export default autoLoad