import { app } from 'electron'

const changeName = () => {
	if (process.platform === 'win32')	{
		app.setAppUserModelId(app.getName())
	}
}

export default changeName