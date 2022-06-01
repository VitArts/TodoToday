import { autoUpdater } from 'electron-updater'

// logs
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

export const checkForUpdates = () => {
	// Проверка обновлений на гитхабе
	autoUpdater.checkForUpdates()
}