import config from './change-config'

const safeResize = () => {
	const handleGetDim = (e) => {
		const width = e.target.outerWidth
		config('width', width)
	}
	
	window.addEventListener('resize', handleGetDim)
}

export default safeResize