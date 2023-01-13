import { app } from 'electron'

const autoLoad = () => {
	app.setLoginItemSettings({
		openAtLogin: true,
	})
}

export default autoLoad