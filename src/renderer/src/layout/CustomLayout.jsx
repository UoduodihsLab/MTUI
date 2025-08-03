import { useNavigate, Outlet } from 'react-router'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs//locale/zh-cn'
import { ConfigProvider, Layout } from 'antd'
import { Menu, message, Button, Modal } from 'antd'
import useTModal from '@renderer/hooks/useTModal'
import { setMessageApi } from '../utils/MessageHolder'
import { UpdaterProvider } from '@renderer/context/UpdaterContext'
import MTUpdater from '@renderer/components/MTUpdater'

const { Sider, Header, Content } = Layout

function CustomLayout() {
    const [staticMessageApi, contextHolder] = message.useMessage()

    setMessageApi(staticMessageApi)

    const updaterModal = useTModal()

    const items = [
        {
            key: '/account',
            label: '账号管理'
        },
        {
            key: '/channel',
            label: '频道管理'
        },
        {
            key: '/bot',
            label: '机器人管理'
        },
        {
            key: '/task',
            label: '任务管理'
        },
    ]

    const navigate = useNavigate()
    function onClickItem(e) {
        console.log(e)
        navigate(e.key)
    }

    return (
        <ConfigProvider locale={zhCN}>
            {contextHolder}
            <UpdaterProvider>
                <Layout className="h-full">
                    <Sider style={{ background: '#fff' }}>
                        <Menu items={items} onClick={onClickItem} />
                    </Sider>
                    <Layout>
                        <Header
                            style={{ background: '#fff' }}
                            className="flex justify-end items-center"
                        >
                            <div>
                                <Button type="primary" onClick={updaterModal.openModal}>
                                    检查更新
                                </Button>
                            </div>
                        </Header>
                        <Content>
                            <Outlet />
                        </Content>
                    </Layout>
                    <Modal title="更新" {...updaterModal.modalProps} footer={null}>
                        <MTUpdater />
                    </Modal>
                </Layout>
            </UpdaterProvider>
        </ConfigProvider>
    )
}

export default CustomLayout
