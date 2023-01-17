import { ipcRenderer } from 'electron'

const colorMode = () => {
	const colorsTheme = document.querySelectorAll('.color-theme a')
	const colorsThemeActive = document.querySelector('.color-theme a.active')

	colorsTheme.forEach((color) => color.addEventListener('click', () => {
		ipcRenderer.send('color', color.dataset.theme)
	}))

	ipcRenderer.send('color', colorsThemeActive.dataset.theme)

}

export default colorMode