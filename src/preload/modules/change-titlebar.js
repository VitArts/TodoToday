const checkHeightTitleBar = () => {
	const toggleSize = document.querySelector('.toggle-size')
	const titleBar = document.querySelector('.titlebar')

	if (toggleSize.value === '0.95') {
		titleBar.style.height = '33px'
	}

	if (toggleSize.value === '1.05') {
		titleBar.style.height = '30px'
	}

	if (toggleSize.value === '1.00') {
		titleBar.style.height = null
	}
}

export default checkHeightTitleBar