import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export default class Side extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
                <Sider
                    collapsible
                    breakpoint="lg"
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    className="sideBgColor"
                >
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  className="sideBgColor">
                        <h2 className="sideColor sideCenter">排队管理客户端</h2>
                        <Menu.Item key="1">
                            <Icon type="bell" color="red"/>
                            <span className="sideColor">叫号清桌</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop"/>
                            <span className="sideColor">入场验证</span>
                        </Menu.Item>
                        <div style={{paddingLeft:"24px"}}>
                            <span>门店信息设置</span>
                        </div>
                        <Menu.Item key="4">
                            <Icon type="file" />
                            <span className="sideColor">基本信息设置</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="file" />
                            <span className="sideColor">排队规则设置</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="file" />
                            <span className="sideColor">门店桌位图及桌信息设置</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="file" />
                            <span className="sideColor">菜单信息上传更新</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}