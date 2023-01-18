import { ipcRenderer, shell } from 'electron'
require('./about.css')

const about = () => {
	const button = document.querySelector('.about button')
	const links = document.querySelectorAll('.about a')
	const version = document.querySelector('.about .version')
	const name = document.querySelector('.about .name')
	const body = document.querySelector('body')

	button.addEventListener('click', () => {
		ipcRenderer.send('quit', 'quit')
	})

	ipcRenderer.on('name', (_, date) => {
		name.textContent = date
	})

	ipcRenderer.on('version', (_, date) => {
		version.textContent = date
	})

	ipcRenderer.on('theme', (_, date) => {
	 if (date === 'light') {
			body.style.backgroundColor = '#fff'
			body.style.color = '#000'
	 }

	 if (date === 'dark') {
			body.style.backgroundColor = '#0f0f0f'
			body.style.color = '#fff'
	 }
	})

	ipcRenderer.on('color', (_, date) => {
		body.className = ''
		body.classList.add(date)
	 })

	links.forEach((link) => link.addEventListener('click', (e) => {
		e.preventDefault()
		shell.openExternal(link.href)
	}))
}

export default about