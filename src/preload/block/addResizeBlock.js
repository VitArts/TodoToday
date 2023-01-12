const addResizeBlock = () => {
	const resizeWindow = document.createElement('div')
	resizeWindow.classList.add('param')
	resizeWindow.innerHTML = `<div class="icon-param"> 
	<div class="icon-param-icon"><i class="fi-rr-search"></i></div>	 
	<div class="icon-pram-text">Масштаб	
		<p>Масштаб по умолчанию</p></div>	</div>
	<div class="button-param"> 
		<select class="select-css toggle-size"> 
			<option value="1.05">110%</option> 
			<option value="1.00">100%</option> 
			<option value="0.95">90%</option> 
			</select>
	</div>`

	const paramContent = document.querySelector('.content .param')
	paramContent.after(resizeWindow)

	const browserZoomLevel = window.devicePixelRatio
	const toggleSize = document.querySelector('.toggle-size')

	for (let option of toggleSize.options) {
		if (browserZoomLevel.toFixed(2) === option.value) {
			option.selected = true
		}
	}
}

export default addResizeBlock