
import React from 'react';
import { Layout,Button,Row,Col,Input } from 'antd';
import '../styles/callclear.css'
import HeaderCustom from './HeaderCustom'
import verify from '../images/verify_pic.png';
const { Content } = Layout;


export default class Verify extends React.Component{
    render(){
        return (
                <Content style={{ background: '#fff', padding:20, margin:24}}>
                    <Row style={{height:'89%'}}>
                        <Col span={24} className='Media-width' style={{height:'100%',paddingBottom:"80px"}}>
                            <Row>
                                <Col span={12} className='Verify-method'>
                                    <h3>方式一</h3>
                                </Col>
                                <Col span={12} className='Verify-method'>
                                    <h3>方式二</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <label>请输入排号:</label>
                                    <Input style={{width:"150px"}}/>
                                    <Button type="danger">查询</Button>
                                </Col>
                                <Col span={12}>
                                    <img src={verify} alt='' style={{width:"10%",height:"10%"}}/>
                                    <span>请用扫描设备，扫描客户的二维码，查询信息</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
        )
    }

}