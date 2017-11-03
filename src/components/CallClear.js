import React from 'react';
import { Layout,Icon,Button,Row,Col,Input } from 'antd';
import '../styles/callclear.css'
import HeaderCustom from './HeaderCustom'
import ShowQueue from "./ShowQueue"
import TableState from "./TableState"
const { Content,} = Layout;


export default class CallClear extends React.Component{
    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content className="Call-line">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2} style={{paddingTop:"5px"}}>输入桌ID号:</Col>
                        <Col span={3}><Input type='input' ref='tableID' placeholder='001' /></Col>
                        <Col span={1}></Col>
                        <Col span={2}><Button type='primary' style={{backgroundColor:"#F27241",border:"none",color:"white"}}>呼叫排号</Button></Col>
                        <Col span={5} style={{color:'orange',fontSize:'14px',paddingTop:"8px"}}><Icon type="notification"/>当前叫号: 顾客,请到桌就餐</Col>
                        <Col span={5}></Col>
                        <Col span={3}><Button type='primary'>手动叫号拼桌</Button></Col>
                        <Col span={2}><Button type='primary'>暂停叫号</Button></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col>
                            <ShowQueue/>
                        </Col>
                    </Row>
                    <Row>
                         <Col>
                            <TableState/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}