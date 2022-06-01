import { app,  BrowserWindow, Tray, Menu } from 'electron'
import { checkForUpdates } from './updater'
import path from 'path'
import icon from 'trayTemplate.png'

let window = null
const additionalData = { myKey: 'myValue' }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

// Проверка обновлений
setTimeout(() => {
  checkForUpdates()
}, 2000)

// Если повторный запуск
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // Print out data received from the second instance.
    console.log(additionalData)

    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })
  // При запуске приложения
  app.on('ready', () => {
 // Получаем максимальный размер окна
 // const { width, height } = screen.getPrimaryDisplay().workAreaSize
 
 // Настройки для окна приложения
 let window = new BrowserWindow({
   width: 400,
   maxWidth: 450,
   minWidth: 350,
   height: 800,
   show: false,
   alwaysOnTop: true,
   titleBarStyle: 'hidden',
   titleBarOverlay: {
    color: '#fff',
    symbolColor: '#1a3b5d'
    },
   backgroundColor : '#fff',
   webPreferences: {
   // nodeIntegration: false,
    preload: path.join(app.getAppPath(), 'preload/index.js'),
    // contextIsolation: false,
    // enableRemoteModule: true,
   }
 })

 // Меню для трея
 const trayMenu = Menu.buildFromTemplate([
   {
     label: 'Показать / Скрыть',
     click: () => {
      window.isVisible() ? window.hide() : window.show()
    }
   }, {
     label: 'Выход',
     click: () => {
      window.close()
    }
   }
 ])

  // Иконка для трея
  const tray = new Tray(path.resolve(__dirname, icon))

  // Добавляем меню и название
  tray.setToolTip('TodoToday')
  tray.setContextMenu(trayMenu)

  // Загрузка из вне
  window.loadURL('https://todotoday.ru')

  // Консоль
  // window.webContents.openDevTools() 
 
  window.on('ready-to-show', () => {
  window.show()
  })

})

}