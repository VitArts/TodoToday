import { ipcRenderer } from 'electron'

const darkMode = () => {
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
}

export default darkMode