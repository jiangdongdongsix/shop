import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import history from './../history';
import { Link } from 'react-router-dom';
import './../styles/sidebar.css'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export default class Side extends React.Component {
    render() {
        return (
                <Sider
                    collapsible={false}
                    className="sideBgColor"
                >
                    <Menu theme="dark" defaultSelectedKeys={['1']}  className="sideBgColor">
                        <h2 className="sideTitleColor sideCenter">排队管理客户端</h2>
                        <Menu.Item key="1"  style={{borderLeft:'5px #f27241 solid'}}>
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
                        <Menu.Item  style={{borderBottom: '1px solid #424753',cursor:'auto'}}>
                        <div className='sideSecondTitle'>
                            <span>门店信息设置</span>
                        </div>
                        </Menu.Item>
                        <Menu.Item key="3" >
                            <Link to="/basicInfo">
                                <i class="iconfont">&#xe607;</i>
                                <span className="sideColor">基本信息设置</span>
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/tabletype">
                                <i class="iconfont">&#xe613;</i>
                                <span className="sideColor">桌类型设置</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/tableset">
                                <i class="iconfont">&#xe614;</i>
                            <span className="sideColor">门店桌位图及桌信息设置</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/menu">
                                <i class="iconfont">&#xe604;</i>
                            <span className="sideColor">菜单信息上传更新</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/area">
                                <i class="iconfont">&#xe604;</i>
                                <span className="sideColor">区域信息设置</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}