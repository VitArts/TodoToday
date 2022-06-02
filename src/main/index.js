import { checkForUpdates } from './updater'
import { appTodo } from './app'

// Проверка обновлений
setTimeout(() => {
  checkForUpdates()
}, 2000)

// Запуск основной функции
appTodo()