import os from 'os'
import path from 'path'
import fs from 'fs'
const log = require('electron-log')

const logDir = path.join(os.homedir(), 'MTDesktopLogs')

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}

log.transports.file.resolvePathFn = () => path.join(logDir, 'MTDesktop.log')

log.transports.console.level = 'info'
log.transports.file.level = 'info'

log.info('日志初始化成功')
console.log('日志路径:', log.transports.file.getFile().path)

export default log
