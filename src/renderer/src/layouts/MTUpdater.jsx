import { useUpdater } from '@renderer/context/UpdaterContext'
import { Button, Progress } from 'antd'

export default function MTUpdater() {
    const { updateInfo, actions } = useUpdater()
    const { status, message, progress } = updateInfo
    return (
        <div>
            {status !== 'idle' && <p className="mb-[12px]">{message}</p>}
            {status === 'downloading' && progress && (
                <Progress percent={Math.floor(progress.percent)} />
            )}

            <div className="flex justify-end">
                {(status === 'idle' || status === 'not-available' || status === 'error') && (
                    <Button onClick={actions.checkForUpdates}>检查更新</Button>
                )}

                {status === 'available' && (
                    <Button onClick={actions.startDownload}>立即下载</Button>
                )}

                {status === 'downloaded' && (
                    <Button onClick={actions.quitAndInstall}>重启并安装</Button>
                )}
            </div>
        </div>
    )
}
