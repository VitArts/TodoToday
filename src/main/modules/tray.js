import { app, Tray,	Menu, dialog } from 'electron'
import path from 'path'
import icon from 'trayTemplate.png'
import iconLarge from 'icon.png'

const tray = (window) => {
	let aboutModal  = {
		buttons: ["Хорошо"],
		type: 'info',
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
	tray.setToolTip(app.getName())
	tray.setContextMenu(trayMenu)
	tray.setIgnoreDoubleClickEvents(true)

	// Повторный запуск
	tray.on('click', function(){
	window.isVisible() ? window.hide() : window.show()
	})
}

export default tray