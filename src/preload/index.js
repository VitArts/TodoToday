import { ipcRenderer } from 'electron'

console.log('test')

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

  document.querySelector('.apps-download-btn').remove()

}