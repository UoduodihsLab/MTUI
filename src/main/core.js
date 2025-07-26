import fs from 'fs'
import path from 'path'
import { spawn, execSync } from 'child_process'
import { app } from 'electron'
import { is } from '@electron-toolkit/utils'
import logger from './logger'

let coreProcess = null

export function startCore() {
    const userDataPath = app.getPath('userData')
    const sessionsPath = path.join(userDataPath, 'sessions')
    const userDbPath = path.join(userDataPath, 'mtcore.db')

    const resourcesPath = app.isPackaged && !is.dev
    ? process.resourcesPath 
    : path.join(__dirname, '../../')

    const sourceDbPath = path.join(resourcesPath, 'mtcore', 'mtcore.db')
    const coreExePath = path.join(resourcesPath, 'mtcore', 'mtcore.exe')
    const coreEnvPath = path.join(resourcesPath, 'mtcore')

    logger.info('正在初始化用户数据...')
    try {
        if (!fs.existsSync(sessionsPath)) {
            logger.info('正在创建 sessions 目录: ', sessionsPath)
            fs.mkdirSync(sessionsPath, { recursive: true })
        }

        if (!fs.existsSync(userDbPath)) {
            logger.info(`用户数据库不存在, 从 ${sourceDbPath} 复制到 ${userDbPath}`)
            fs.copyFileSync(sourceDbPath, userDbPath)
        }
    } catch (error) {
        logger.error('初始化用户数据时出错: ', error)
        return
    }
    logger.info('用户数据初始化成功')

    logger.info(`准备启动 MTCore: ${coreExePath}`)

    coreProcess = spawn(coreExePath, [], {
        cmd: coreEnvPath,
        env: {
            ...process.env,
            SESSIONS_PATH: sessionsPath,
            DATABASE_PATH: userDbPath
        }
    })

    coreProcess.stdout.on('data', (data) => {
        logger.info(`[MTCore]: ${data}`)
    })

    coreProcess.stderr.on('data', (data) => {
        logger.error(`[MTCore ERR]: ${data}`)
    })

    // coreProcess.on('close', (code) => {
    //     logger.info(`MTCore 已退出, 退出码 ${code}`)
    //     coreProcess = null
    // })

    logger.info('MTCore 启动成功')
}

export function killCore() {
    if (coreProcess) {
        logger.info('正在关闭MTCore子进程...')

        if (process.platform === 'win32') {
            try {
                execSync(`taskkill /pid ${coreProcess.pid} /f /t`)
                logger.info('MTCore 进程树已成功终止')
            } catch (error) {
                logger.error(`使用 taskkill 终止进程失败, 尝试使用常规方法终止: ${error}`)
                coreProcess.kill('SIGKILL')
            }
        } else {
            coreProcess.kill('SIGKILL')
        }
        coreProcess = null
    }
}
