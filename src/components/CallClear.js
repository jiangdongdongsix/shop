import React from 'react';
import { Menu,Layout,Icon,Button,Row,Col,Input } from 'antd';
import '../styles/callclear.css'
import HeaderCustom from './HeaderCustom'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export default class CallClear extends React.Component{
    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content className="Call-line">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}>输入桌ID号:</Col>
                        <Col span={3}><Input type='input' ref='tableID' placeholder='001' /></Col>
                        <Col span={1}></Col>
                        <Col span={3}><Button type='primary'>呼叫排号</Button></Col>
                        <Col span={1}></Col>
                        <Col span={10} style={{color:'orange',fontSize:'14px'}}><Icon type="notification"/>当前叫号: 顾客,请到桌就餐</Col>
                        <Col span={3}><Button type='primary'>暂停叫号</Button></Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}