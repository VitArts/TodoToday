import { ipcRenderer } from 'electron'
import config from './change-config'
import getConfig from './get-config'

const autoLoad = () => {
	const param = document.createElement('div')
	param.classList.add('param')
	param.innerHTML = `<div class="icon-param"> 
										<div class="icon-param-icon"><i class="fi fi-rr-rotate-right"></i></div>	 
										<div class="icon-pram-text">Автозагрузка	
											<p>Включить автозагрузку приложения</p></div>	</div>
										<div class="button-param"> 
											<div class="custom-control scale-switch ios-switch">
											<input type="checkbox" class="ios-input" id="switch-autoload">
											<label class="custom-control-label" for="switch-autoload"></label>
											</div>
										</div>`

const contentParam = document.querySelector('.content .param')
			contentParam.after(param)

const autoloadDiv = param.querySelector('#switch-autoload')

	// Первоначальные настройки при загрузке
	if (getConfig('autoLoad') === undefined) {
		config('autoLoad', true)
		autoloadDiv.checked = true
	} else {
		autoloadDiv.checked = getConfig('autoLoad')
		ipcRenderer.send('autoLoad', getConfig('autoLoad'))
	}

	// Обработчик события при изменении
	autoloadDiv.addEventListener('change', (e) => {
		config('autoLoad', e.target.checked)
		ipcRenderer.send('autoLoad', e.target.checked)
	})			
}

export default autoLoad