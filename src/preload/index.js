import { ipcRenderer } from 'electron'

window.onload = () => {

  window.addEventListener('online', () => {
     const alert = new Notification('TodoToday', {
       body: 'Приложение онлайн',
     })
  })

  window.addEventListener('offline', () => {
    const alert = new Notification('TodoToday', {
      body: 'Проверьте соединение с интернетом'
    })
  })

}