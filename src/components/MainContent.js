/**
 * Created by yan on 2017/10/22.
 */
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Side from "./SideBar";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export default class MainContent extends React.Component{
    render(){
        return (
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        )
    }

}