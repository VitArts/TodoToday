import { ipcRenderer } from 'electron'
import config from './change-config'
import getConfig from './get-config'

const alwayOnTop = () => {
	// Создаем окно и добавляем его в дом
	const param = document.createElement('div')
				param.classList.add('param')
				param.innerHTML = `<div class="icon-param"> 
													<div class="icon-param-icon"><i class="fi fi-rr-clip"></i></div>	 
													<div class="icon-pram-text">Поверх экрана	
														<p>Закрепить окно поверх экрана</p></div>	</div>
													<div class="button-param"> 
														<div class="custom-control scale-switch ios-switch">
														<input type="checkbox" class="ios-input" id="switch-color-list">
														<label class="custom-control-label" for="switch-color-list"></label>
														</div>
													</div>`

	const contentParam = document.querySelector('.content .param')
				contentParam.after(param)

	const alwaysDiv = document.querySelector('.param .ios-input')

	// Первоначальные настройки при загрузке
	if (getConfig('alwaysOnTop') === undefined) {
		config('alwaysOnTop', true)
		alwaysDiv.checked = true
	} else {
		alwaysDiv.checked = getConfig('alwaysOnTop')
		ipcRenderer.send('alwaysOnTop', getConfig('alwaysOnTop'))
	}

	// Обработчик события при изменении
	alwaysDiv.addEventListener('change', (e) => {
		config('alwaysOnTop', e.target.checked)
		ipcRenderer.send('alwaysOnTop', e.target.checked)
	})


}

export default alwayOnTop