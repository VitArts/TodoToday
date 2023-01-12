import { app, BrowserWindow, Tray,	Menu, dialog, session, ipcMain } from 'electron'
import path from 'path'
import icon from 'trayTemplate.png'
import iconLarge from 'icon.png'

export const appTodo = () => {
	let window = null
	const additionalData = {
		myKey: 'myValue'
	}
	const gotTheLock = app.requestSingleInstanceLock(additionalData)

	// Если повторный запуск
	if (!gotTheLock) {
		app.quit()
	} else {
		app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
			if (window) {
				if (window.isMinimized()) window.restore()
				window.focus()
			}
		})

		// Автозагрузка
		app.setLoginItemSettings({
			openAtLogin: true,
		})
		
		// При запуске приложения
		app.on('ready', () => {
			// Получаем максимальный размер окна
			// const { width, height } = screen.getPrimaryDisplay().workAreaSize
			session.defaultSession.clearCache()
			// Настройки для окна приложения
			let window = new BrowserWindow({
				width: 380,
				maxWidth: 550,
				minWidth: 340,
				height: 800,
				fullscreen: false,
				fullscreenable: false,
				show: false,
				// opacity: 0.95,
				alwaysOnTop: true,
				autoHideMenuBar: true,
				titleBarStyle: 'hidden',
				titleBarOverlay: {
					color: '#fff',
					symbolColor: '#7e7e7e',
					height: 31
				},
				frame: false,
				webPreferences: {
					// nodeIntegration: false,
					preload: path.join(app.getAppPath(), 'preload/index.js'),
					// contextIsolation: false,
					// enableR emoteModule: true,
				}
			})

			// Проверяем если не макос то переключаем темы
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
			
		// Переключаем масштаб
				ipcMain.on('size', (_, data) => {
						const num = Number(data)
						window.webContents.setZoomFactor(num);
				})

		// Переключаем размер окна
				ipcMain.on('resize', (_, data) => {
						const num = Number(data)
						window.setContentSize(num, window.getSize()[1])
				})

			// Окно о программе
			let aboutModal  = {
				buttons: ["Хорошо"],
				type: 'info',
				icon: path.resolve(__dirname, iconLarge),
				title: "О программе",
				detail: 'Версия - 0.2.2\nВеб версия - TodoToday.ru\nРазработка - VitArts.ru',
				message: "TodoToday"
			 }

			// Меню для трея
			const trayMenu = Menu.buildFromTemplate([{
				label: 'Показать / Скрыть',
				click: () => {
					window.isVisible() ? window.hide() : window.show()
				}
			}, {
				label: 'О программе',
				click: () => {
					dialog.showMessageBox(window, aboutModal)
				}
			}, {
				label: 'Выход',
				click: () => {
					window.close()
				}
			}])

			// Иконка для трея
			const tray = new Tray(path.resolve(__dirname, icon))

			// Добавляем меню и название
			tray.setToolTip('TodoToday')
			tray.setContextMenu(trayMenu)
			tray.setIgnoreDoubleClickEvents(true)
			tray.on('click', function(e){
				window.isVisible() ? window.hide() : window.show()
			});

			// Загрузка из вне
			window.loadURL('https://todotoday.ru/')

			// Консоль
		  //window.webContents.openDevTools() 
			window.on('ready-to-show', () => {
				window.show()
				window.setTitle('')
			})
		})
	}
}