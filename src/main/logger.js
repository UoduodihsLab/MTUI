import os from 'os'
import path from 'path'
import fs from 'fs'
import logger from 'electron-log'

const logDir = path.join(os.homedir(), 'MTDesktopLogs')

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}

logger.transports.file.file = path.join(logDir, 'MTDesktop.log')

logger.transports.console.level = 'info'
logger.transports.file.level = 'info'

logger.info('日志初始化成功')
console.log('日志路径:', logger.transports.file.file)

export default logger
