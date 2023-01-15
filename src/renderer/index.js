import { ipcRenderer } from 'electron'

window.onload = () => {
	const button = document.querySelector('.about button')

	button.addEventListener('click', () => {
		console.log('ff')
		ipcRenderer.send('quit', 'quit')
	})
}
