

const notifications = () => {
	const icon = 'img/icon.png'

// Уведомление о том что есть интернет
window.addEventListener('online', () => {
	new Notification('Онлайн', {
			body: 'Приложение онлайн',
			icon: icon
		})
 })

 // Уведомление о том что проблемы с интернетом
 window.addEventListener('offline', () => {
	 new Notification('Офлайн', {
		 body: 'Проверьте соединение с интернетом',
		 icon: icon
	 })
 })

 // Кол-во задач
 const openTask = document.querySelector('.todo-all span').textContent

 // Уведомление об открытых задачах
 if (Number(openTask) > 0) {
	new Notification('С возвращением!', { 
		body: `Открытых задач на сегодня - ${openTask} шт.`,
		icon: icon
	})
 }

}

export default notifications