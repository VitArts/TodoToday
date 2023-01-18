const getConfig = (atr) => {
	const configLs = JSON.parse(localStorage.getItem('config'))
				return configLs[atr]
}

export default getConfig