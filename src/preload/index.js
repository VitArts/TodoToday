import { ipcRenderer } from 'electron'
import addResizeBlock from './block/addResizeBlock.js'
import checkHeightTitleBar from './block/checkHeightTitleBar.js'

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

  setTimeout(() => {
    // Уведомление об открытых задачах
    const openTask = document.querySelector('.todo-all span').textContent
    const NOTIFICATION_TITLE = 'С возвращением!'
    const NOTIFICATION_BODY = `Открытых задач на сегодня - ${openTask} шт.`
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  }, 2000);

  // Ручное переключение темы
  const toggleTheme = document.querySelector('.toggle-theme')
  const titlebar = document.querySelector('.titlebar')
  const checkTheme = () => {
    if (toggleTheme.value !== 'auto') {
      ipcRenderer.send('theme', toggleTheme.value)
      bgrTitleBar(toggleTheme.value)
    // Если режим авто то проверяем какой режим оформления в виндовс и отправляем на маин процесс информацию о режими в виндовс  
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        ipcRenderer.send('theme', 'dark')
        bgrTitleBar('dark')
      } else {
        ipcRenderer.send('theme', 'light')
        bgrTitleBar('light')
      }
    }
  }

   // Функция изменения цвета бара
   const bgrTitleBar = (theme) => {
    titlebar.style.backgroundColor = theme === 'light' ? '#fff' : '#0f0f0f'
  }

  checkTheme()

  // Отслеживаем переключение темы в ручном режими
    toggleTheme.addEventListener('change',  checkTheme)
 
  // Отслеживаем переключение в виндовс и отправляем информацию на маин процесс 
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (toggleTheme.value === 'auto') {
      const newColorScheme = e.matches ? "dark" : "light"
      bgrTitleBar(newColorScheme)
      ipcRenderer.send('theme', newColorScheme)
    }
  });


  // Размер окна
  addResizeBlock()

  // Отслеживаем переключение
  checkHeightTitleBar()

  document.querySelector('.toggle-size').addEventListener('change', () => {
  ipcRenderer.send('size', document.querySelector('.toggle-size').value)
  checkHeightTitleBar()
})


// Запоминаем размер окна
const handleGetDim = (e) => {
  const width = e.target.outerWidth
  localStorage.setItem('width', width)
}

window.addEventListener('resize', handleGetDim)

// Проверяем размер окна при загрузки
if (localStorage.getItem('width') && Number(localStorage.getItem('width')) >= 340) {
  ipcRenderer.send('resize', localStorage.getItem('width'))
}

// function listenOnDevicePixelRatio() {
//   function onChange() {
//     console.log("devicePixelRatio changed: " + window.devicePixelRatio);
//     listenOnDevicePixelRatio();
//   }
//   matchMedia(
//     `(resolution: ${window.devicePixelRatio}dppx)`
//   ).addEventListener("change", onChange, { once: true });
// }

// listenOnDevicePixelRatio();
}