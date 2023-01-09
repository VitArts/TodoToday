import { app, BrowserWindow, Tray,	Menu, dialog, session } from 'electron'
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
				maxWidth: 450,
				minWidth: 380,
				height: 800,
				fullscreen: false,
				fullscreenable: false,
				show: false,
				// opacity: 0.95,
				alwaysOnTop: true,
				titleBarStyle: 'hidden',
				titleBarOverlay: {
					color: 'rgba(0,0,0,0)',
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

			let aboutModal  = {
				buttons: ["Хорошо"],
				type: 'info',
				icon: path.resolve(__dirname, iconLarge),
				title: "О программе",
				detail: 'Версия - 0.1.7\nВеб версия - TodoToday.ru\nРазработка - VitArts.ru',
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
			// window.webContents.openDevTools() 
			window.on('ready-to-show', () => {
				window.show()
			})
		})
	}
}