import { ipcMain } from 'electron'

const size = (window) => {
	ipcMain.on('size', (_, data) => {
		const num = Number(data)
		window.webContents.setZoomFactor(num);
})
}

export default size