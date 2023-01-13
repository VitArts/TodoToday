const notifications = () => {

// Уведомление о том что есть интернет
window.addEventListener('online', () => {
	new Notification('Онлайн', {
			body: 'Приложение онлайн',
		})
 })

 // Уведомление о том что проблемы с интернетом
 window.addEventListener('offline', () => {
	 new Notification('Офлайн', {
		 body: 'Проверьте соединение с интернетом'
	 })
 })

 // Кол-во задач
 const openTask = document.querySelector('.todo-all span').textContent

 // Уведомление об открытых задачах
 if (Number(openTask) > 0) {
	new Notification('С возвращением!', { 
		body: `Открытых задач на сегодня - ${openTask} шт.` 
	})
 }

}

export default notifications