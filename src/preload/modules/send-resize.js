import { ipcRenderer } from 'electron'

const sendResize = () => {
	if (localStorage.getItem('width') && Number(localStorage.getItem('width')) >= 340) {
		ipcRenderer.send('resize', localStorage.getItem('width'))
	}
}

export default sendResize