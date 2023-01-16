import { ipcMain } from 'electron'

const theme = (window) => {
		// Получаем данные из основного окна при переключении темы
		ipcMain.on('theme', (_, data) => {
		// Проверяем если не макос то запускаем
			if (require('node:os').type() !== 'Darwin') {
				if (window.getTitle() !== 'О программе') {
					if (data === 'light') {
						window.setTitleBarOverlay({color:'#fff'})
						}
				
					if (data === 'dark') {
							window.setTitleBarOverlay({color:'#0f0f0f'})
						}
					}
				}
					// Отправляем в окно о программе
					window.webContents.send('theme', data);
		})
	}


export default theme