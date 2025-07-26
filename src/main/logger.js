import os from 'os'
import path from 'path'
import fs from 'fs'
import logger from 'electron-log'

const logDir = path.join(os.homedir(), 'MTDesktopLogs')

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}

logger.transports.file.resolvePathFn = () => path.join(logDir, 'MTDesktop.log')

logger.transports.console.level = 'info'
logger.transports.file.level = 'info'

logger.info('日志系统初始化成功')
logger.info('日志路径:', logger.transports.file.getFile().path)

export default logger
