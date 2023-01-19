import { ipcRenderer } from 'electron'
import changeTitleBar from './change-titlebar'

const sendToggle = () => {
	const toggleSize = document.querySelector('.toggle-size')

	toggleSize.addEventListener('change', () => {
		ipcRenderer.send('size', toggleSize.value)
		changeTitleBar()
	})
}

export default sendToggle