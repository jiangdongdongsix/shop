import React from 'react';
import { Layout,Button,Row,Col,Input } from 'antd';
import waitVerify from '../images/wait_verify_pic.png';
import MethodVerify from "./MethodVerify";
import HeaderCustom from './HeaderCustom'
const {Content} = Layout;


export default class WaitVerify extends React.Component{
    constructor(){
        super();
        this.state = {
            extractFlag:"0"
        }
    }

   changeFlag = (extractFlag) => {
       this.setState({extractFlag:extractFlag});
   }

    render(){
        const {extractFlag} = this.state;
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <MethodVerify onChange={(e) => this.changeFlag(e)}/>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20} style={{borderTop:"1px #f9f7f7 solid"}}>
                            <Row style={{paddingTop:"30px"}}>
                                <Col span={8}></Col>

                                <Col span={8} offset={2}>
                                    {this.state.extractFlag == '1'?
                                        <Row>恭喜你可以用餐了</Row>:<Row>您的排号未到</Row>}
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
