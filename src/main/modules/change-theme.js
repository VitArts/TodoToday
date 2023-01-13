import { ipcMain } from 'electron'

const theme = (window) => {
	// Проверяем если не макос то запускаем
	if (require('node:os').type() !== 'Darwin') {
		ipcMain.on('theme', (_, data) => {
			if (data === 'light') {
			//	nativeTheme.themeSource = 'light'
				window.setTitleBarOverlay({color:'#fff'})
			} 

			if (data === 'dark') {
				//	nativeTheme.themeSource = 'light'
				window.setTitleBarOverlay({color:'#0f0f0f'})
			}
		})
	}
}

export default theme