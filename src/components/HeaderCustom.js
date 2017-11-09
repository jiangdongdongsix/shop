import React from 'react';
import { Menu,Layout,Icon,Button,Row,Col,Input } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


// 头部组件
export default class HeaderCustom extends React.Component{
    render(){
        return (
                <Header  style={{backgroundColor:'white',textAlign:'right',verticalAlign:'bottom',borderBottom:"2px solid #f9f7f7",height:'60px'}}>
                    <span>您好，欢迎登录</span>
                </Header>
        )
    }

}