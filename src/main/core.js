import { app } from 'electron'

import path from 'path'
import { is } from '@electron-toolkit/utils'
import { spawn } from 'child_process'

let coreProcess = null

export function startCore() {
    const coreExcutableName = 'MTCore.exe'
    const coreFolder = 'core'

    let coreExcutablePath = ''

    if (app.isPackaged || !is.dev) {
        coreExcutablePath = path.join(process.resourcesPath, coreFolder, coreExcutableName)
    } else {
        coreExcutablePath = path.join(__dirname, `../../extra/core/${coreExcutableName}`)
    }

    console.log('正在启动core...')

    coreProcess = spawn(coreExcutablePath, [])

    coreProcess.stdout.on('data', (data) => {
        console.log(`[MTCore STDOUT]: ${data.toString()}`)
    })

    coreProcess.stderr.on('data', (data) => {
        console.error(`[MTCore STDERR]: ${data.toString()}`)
    })

    coreProcess.on('close', (code) => {
        console.log(`MTCore 子进程退出, 退出码: ${code}`)
    })
}
