import { app, BrowserWindow, session } from 'electron'
import path from 'path'
import theme from './modules/change-theme'
import name from './modules/change-name'
import size from './modules/change-size'
import resize from './modules/change-resize'
import tray from './modules/tray'
import autoLoad from './modules/autoload'

const appTodo = () => {
	let window = null

	const additionalData = {
		myKey: 'myValue'
	}

	const gotTheLock = app.requestSingleInstanceLock(additionalData)
	// Если повторный запуск
	if (!gotTheLock) {
		app.quit()
	} else {
		app.on('second-instance', () => {
			if (window) {
				if (window.isMinimized()) window.restore()
				window.focus()
			}
		})

		// Автозагрузка
		autoLoad()
		
		// При запуске приложения
		app.on('ready', () => {

		// Очищаем кеш при запуске
		session.defaultSession.clearCache()

		// Настройки для окна приложения
		window = new BrowserWindow({
			width: 380,
			maxWidth: 550,
			minWidth: 340,
			height: 800,
			fullscreen: false,
			fullscreenable: false,
			show: false,
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

		// Смена темы
		theme(window)
			
		// Переключаем масштаб
		size(window) 

		// Переключаем размер окна
		resize(window)	

		// Меняем название программы в уведомлении	
		name() 

		// Меню для трея
		tray(window)

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

export default appTodo