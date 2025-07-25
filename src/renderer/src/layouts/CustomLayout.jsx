import { useNavigate, Outlet } from 'react-router'
import { ConfigProvider, Layout } from 'antd'
import { Menu, message, Button, Modal } from 'antd'
import useTModal from '@renderer/hooks/useTModal'
import { setMessageApi } from '../utils/MessageHolder'
import { UpdaterProvider } from '@renderer/context/UpdaterContext'
import MTUpdater from './MTUpdater'

const { Sider, Header, Content } = Layout

function CustomLayout() {
    const [staticMessageApi, contextHolder] = message.useMessage()

    setMessageApi(staticMessageApi)

    const updaterModal = useTModal()

    const items = [
        {
            key: '/home',
            label: '主页'
        },
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
        {
            key: '/lang',
            label: '语言管理'
        }
    ]

    const navigate = useNavigate()
    function onClickItem(e) {
        console.log(e)
        navigate(e.key)
    }

    return (
        <ConfigProvider>
            {contextHolder}
            <UpdaterProvider>
                <Layout className="h-full">
                    <Sider style={{ background: '#fff' }}>
                        <Menu items={items} onClick={onClickItem} />
                    </Sider>
                    <Layout>
                        <Header>
                            <Button type="primary" onClick={updaterModal.openModal}>
                                检查更新
                            </Button>
                        </Header>
                        <Content>
                            <Outlet />
                        </Content>
                    </Layout>
                    <Modal title="检查更新" {...updaterModal.modalProps}>
                        <MTUpdater />
                    </Modal>
                </Layout>
            </UpdaterProvider>
        </ConfigProvider>
    )
}

export default CustomLayout
