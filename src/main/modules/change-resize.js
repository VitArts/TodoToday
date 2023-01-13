import { ipcMain } from 'electron'

const resize = (window) => {
	ipcMain.on('resize', (_, data) => {
		const num = Number(data)
		window.setContentSize(num, window.getSize()[1])
	})
}

export default resize