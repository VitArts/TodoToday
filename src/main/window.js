import { app, BrowserWindow } from 'electron'
import path from 'path'
import theme from './modules/change-theme'
import name from './modules/change-name'
import size from './modules/change-size'
import resize from './modules/change-resize'
import tray from './modules/tray'

function createWindow() {
	let window = new BrowserWindow({
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

	// Загрузка из вне
	window.loadURL('https://todotoday.ru/')

	// Консоль
	//window.webContents.openDevTools() 
	window.on('ready-to-show', () => {
		window.show()
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
}

export default createWindow