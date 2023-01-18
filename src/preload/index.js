import changeResize from './modules/change-resize'
import changeTitleBar from './modules/change-titlebar'
import sendResize from './modules/send-resize'
import safeResize from './modules/safe-resize'
import sendToggle from './modules/send-toggle'
import darkMode from './modules/dark-mode'
import notifications from './modules/notifications'
import colorMode from './modules/color-mode'
import alwaysOnTop from './modules/send-alwaysOnTop'

window.onload = () => {
  // Уведомления
  notifications()

  // Ручное переключение темы
  darkMode()

  // Размер окна
  changeResize()

  // Отслеживаем переключение
  changeTitleBar()

  // Отправляем данные о выбраном масштабе
  sendToggle()

  // Запоминаем размер окна
  safeResize()

  // Проверяем размер окна при загрузки
  sendResize()

  // Цветовое оформление
  colorMode()

  // Переключатель настройки - поверх экрана
  alwaysOnTop()

// function listenOnDevicePixelRatio() {
//   function onChange() {
//     console.log("devicePixelRatio changed: " + window.devicePixelRatio);
//     listenOnDevicePixelRatio();
//   }
//   matchMedia(
//     `(resolution: ${window.devicePixelRatio}dppx)`
//   ).addEventListener("change", onChange, { once: true });
// }

// listenOnDevicePixelRatio();
}