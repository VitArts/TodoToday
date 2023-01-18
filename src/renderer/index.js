import about from './about/about'

window.onload = () => {
	const location = window.location.href.split('/')
	const nameWindow = location[location.length - 1].split('.')[0]
	
	const funcWindow = {
		about,
	}

	funcWindow[nameWindow]()
}
