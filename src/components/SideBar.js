import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import history from './../history';
import { Link } from 'react-router-dom';
import './../styles/sidebar.css'
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
                        <Menu.Item key="1" className='iconColor'>
                            <Link to="/callnumber">
                                <i class="iconfont">&#xe616;</i>
                                <span className="sideColor">叫号清桌</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Link to="/verify">
                                <i class="iconfont">&#xe611;</i>
                                <span className="sideColor">入场验证</span>
                            </Link>
                        </Menu.Item >
                        <div style={{paddingLeft:"24px"}}>
                            <span>门店信息设置</span>
                        </div>
                        <Menu.Item key="4" >
                            <Link to="/basicInfo">
                                <i class="iconfont">&#xe607;</i>
                                <span className="sideColor">基本信息设置</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/tabletype">
                                <i class="iconfont">&#xe613;</i>
                                <span className="sideColor">桌类型设置</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/tableset">
                                <i class="iconfont">&#xe614;</i>
                            <span className="sideColor">门店桌位图及桌信息设置</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/menu">
                                <i class="iconfont">&#xe604;</i>
                            <span className="sideColor">菜单信息上传更新</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}