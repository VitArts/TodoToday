import { autoUpdater } from 'electron-updater'
import { dialog, BrowserWindow } from 'electron'

// logs
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"
autoUpdater.autoDownload = false

const checkForUpdates = () => {
	// Проверка обновлений на гитхабе
	autoUpdater.checkForUpdatesAndNotify()
	autoUpdater.on('update-available', () => {
			// Показать окно	
			dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
				type : "info",
				title: "Новая версия",
				message: "Доступна новая версия программы,\nзагрузить ее сейчас?",
				buttons: ['Да', 'Нет']
			}).then(({ response }) => {
				if (response === 0) {
					autoUpdater.downloadUpdate()
				}
			})
	})

	autoUpdater.on('update-downloaded', () => {
		dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
			type: "info",
			title: "Обновление загружено",
			message: "Установить его сейчас?",
			buttons: ['Да', 'Нет']
		}).then(({ response }) => {
			if (response == 0) {
				autoUpdater.quitAndInstall(false, true)
			}
		})
	})
}

export default checkForUpdates