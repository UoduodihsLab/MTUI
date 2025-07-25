import { Progress } from 'antd'

export default function TaskProgress({ record }) {
    if (record.status !== 1) return '-'

    const percent = Math.round((record.progress / record.total) * 100 * 100) / 100
    return (
        <>
            <Progress percent={percent} />
        </>
    )
}
