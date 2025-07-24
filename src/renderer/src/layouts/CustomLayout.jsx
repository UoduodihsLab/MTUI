import { useNavigate, Outlet } from 'react-router'
import { ConfigProvider, Layout } from 'antd'
import { Menu, message } from 'antd'

import { setMessageApi } from '../utils/MessageHolder'

const { Sider, Content } = Layout

function CustomLayout() {
    const [staticMessageApi, contextHolder] = message.useMessage()

    setMessageApi(staticMessageApi)

    const items = [
        {
            key: '/home',
            label: '主页'
        },
        {
            key: '/bot',
            label: '机器人管理'
        },
        {
            key: '/task',
            label: '任务管理'
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
            <Layout className="h-full">
                <Sider style={{ background: '#fff' }}>
                    <Menu items={items} onClick={onClickItem} />
                </Sider>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default CustomLayout
