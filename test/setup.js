const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'TotoToday.app', 'Contents', 'MacOS', 'TotoToday')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'TotoToday')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'TotoToday.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
