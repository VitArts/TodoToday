import { app, Tray,	Menu, dialog } from 'electron'
import path from 'path'
import icon from 'trayTemplate.png'
import iconLarge from 'icon.png'
import windowAbout from './window-about'

const tray = (window) => {
	let aboutModal  = {
		//buttons: ["Хорошо"],
		type: 'info',
		normalizeAccessKeys: true,
		icon: path.resolve(__dirname, iconLarge),
		title: "О программе",
		detail: `Версия - ${app.getVersion()}
		Веб версия - ${app.getName()}.ru
		Разработка - VitArts.ru`,
		message: app.getName()
	 }


	const trayMenu = Menu.buildFromTemplate([{
		label: 'Показать / Скрыть',
		click: () => {
			window.isVisible() ? window.hide() : window.show()
		}
	}, {
		label: 'О программе',
		click: () => {
			windowAbout(window) 
		//	dialog.showMessageBox(window, aboutModal)
		}
	}, {
		label: 'Выход',
		click: () => {
			window.close()
		}
	}])

	// Иконка для трея
	const trayOn = new Tray(path.resolve(__dirname, icon))

	// Добавляем меню и название
	trayOn.setToolTip(app.getName())
	trayOn.setContextMenu(trayMenu)
	trayOn.setIgnoreDoubleClickEvents(true)

	// Повторный запуск - НЕ РАБОТАЕТ
	// trayOn.on('click', () => {
	// 	window.isVisible() ? window.hide() : window.show()
	// })
}

export default tray