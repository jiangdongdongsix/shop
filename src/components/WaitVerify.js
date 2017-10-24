import React from 'react';
import { Layout,Button,Row,Col,Input } from 'antd';
import waitVerify from '../images/wait_verify_pic.png';
import MethodVerify from "./MethodVerify";
import HeaderCustom from './HeaderCustom'
const {Content} = Layout;


export default class WaitVerify extends React.Component{
    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <MethodVerify/>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20} style={{borderTop:"1px #f9f7f7 solid"}}>
                            <Row style={{paddingTop:"30px"}}>
                                <Col span={8}></Col>
                                <Col span={8} offset={2}>
                                    <Row>排号未到!</Row>
                                    <Row>
                                        <img src={waitVerify} alt="" style={{width:"50%",height:"50%",marginLeft:"-30px"}}/>
                                    </Row>

                                    <Row style={{marginLeft:"-30px"}}>
                                        <p>A115,前方有5桌，预计>10分钟</p>
                                        <p>取号时间：2017/10/23 17:02</p>
                                    </Row>

                                </Col>
                                <Col span={8}>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
