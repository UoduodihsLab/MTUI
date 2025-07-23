import {useNavigate, Outlet } from 'react-router'
import { Layout } from 'antd'
import { Menu } from 'antd'

const { Sider, Content } = Layout

function CustomLayout() {
    const items = [
        {
            key: '/home',
            label: '主页'
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
        <Layout className="h-full">
            <Sider style={{background: '#fff'}}>
                <Menu items={items} onClick={onClickItem} />
            </Sider>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default CustomLayout
