import { promises as fs } from 'fs'
import { app } from 'electron'

import path from 'path'
import { is } from '@electron-toolkit/utils'
import { spawn } from 'child_process'

let coreProcess = null

export async function ensureDatabaseExists() {
    const userDataPath = app.getPath('userData')
    const userDbPath = path.join(userDataPath, 'mtc.db')

    let templateDbPath = ''
    if (app.isPackaged || !is.dev) {
        templateDbPath = path.join(process.resourcesPath, 'core', 'mtc.db')
    } else {
        templateDbPath = path.join(__dirname, '../../extra/core/mtc.db')
    }

    try {
        await fs.access(userDbPath)
        return userDbPath
    } catch (error) {
        console.error(error)
        try {
            await fs.copyFile(templateDbPath, userDbPath)
            return userDbPath
        } catch (copyError) {
            console.error(copyError)
            throw new Error('无法初始化数据库')
        }
    }
}

export function startCore(dbPath) {
    const coreExcutableName = 'MTCore.exe'
    const coreFolder = 'core'

    let coreExcutablePath = ''

    if (app.isPackaged || !is.dev) {
        coreExcutablePath = path.join(process.resourcesPath, coreFolder, coreExcutableName)
    } else {
        coreExcutablePath = path.join(__dirname, `../../extra/core/${coreExcutableName}`)
    }

    console.log('正在启动 core...')

    coreProcess = spawn(coreExcutablePath, [dbPath])

    coreProcess.stdout.on('data', (data) => {
        console.log(`[MTCore STDOUT]: ${data.toString()}`)
    })

    coreProcess.stderr.on('data', (data) => {
        console.error(`[MTCore STDERR]: ${data.toString()}`)
    })

    coreProcess.on('close', (code) => {
        console.log(`MTCore 子进程退出, 退出码: ${code}`)
    })

    return coreProcess
}
