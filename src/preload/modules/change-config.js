const config = (atr, param) => {
	const configLs = JSON.parse(localStorage.getItem('config'))
				configLs[atr] = param

				localStorage.setItem('config', JSON.stringify(configLs));
}

export default config