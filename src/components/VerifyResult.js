import React from 'react';
import { Layout,Button,Row,Col,Input } from 'antd';
import waitVerify from '../images/wait_verify_pic.png';
import happy from '../images/happy.png';

export default class VerifyResult extends React.Component{

    render(){
        return(
            <Row>
                <Col span={2}></Col>
                <Col span={20} style={{borderTop:"1px #f9f7f7 solid"}}>
                    <Row style={{paddingTop:"30px"}}>
                        <Col span={8}></Col>

                        <Col span={8} offset={2}>
                            {this.props.data.extractFlag == '0'?
                            <div>
                                <Row>您的排号未到！</Row>
                                <Row>
                                    <img src={waitVerify} alt="" style={{width:"50%",height:"50%",marginLeft:"-30px"}}/>
                                </Row>
                                <Row >
                                    <p>{this.props.data.queueInfo.tableType.tableTypeName+this.props.data.queueInfo.queueId+",前方有"+this.props.data.queueInfo.waitPopulation+"桌，预计>"+this.props.data.queueInfo.waitTime+"分钟"}</p>
                                </Row>
                            </div>:
                            <div>
                                <Row>恭喜您可以用餐了</Row>
                                <Row>
                                    <img src={happy} alt="" style={{width:"50%",height:"50%",marginLeft:"-30px"}}/>
                                </Row>
                                <Row >
                                    <p>{this.props.data.queueInfo.tableType.tableTypeName+this.props.data.queueInfo.queueId+"请到"+this.props.data.tableNumber+"用餐"}</p>
                                </Row>

                            </div>}
                            </Col>
                        <Col span={8}>
                        </Col>
                    </Row>
                </Col>
                <Col span={2}></Col>
            </Row>
            )

    }
}