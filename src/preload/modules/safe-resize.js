const safeResize = () => {
	const handleGetDim = (e) => {
		const width = e.target.outerWidth
		localStorage.setItem('width', width)
	}
	
	window.addEventListener('resize', handleGetDim)
}

export default safeResize