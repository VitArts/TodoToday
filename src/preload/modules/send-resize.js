import { ipcRenderer } from 'electron'
import getConfig from './get-config'

const sendResize = () => {
	if (getConfig('width') && Number(getConfig('width')) >= 340) {
		ipcRenderer.send('resize', getConfig('width'))
	}
}

export default sendResize