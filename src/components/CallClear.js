import React from 'react';
import { Layout,Icon,Button,Row,Col,Input,message } from 'antd';
import '../styles/callclear.css'
import HeaderCustom from './HeaderCustom'
import ShowQueue from "./ShowQueue"
import TableState from "./TableState"
const { Content,} = Layout;

export default class CallClear extends React.Component{
    constructor(props){
        super();
        this.state = {
            tableID: '',
            orderNumber: '--',
            tableNumber: '--'
        }
    }
    handleCall(event){
        let that = this;
        fetch('/iqesTT/queue/arrivingCustomer?tableName='+ this.state.tableID).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            that.setState({
                    orderNumber:jsonData.extractNumber.tableNumber.tableType.tableTypeName +jsonData.extractNumber.id,
                    tableNumber: jsonData.extractNumber.tableNumber.name

                }
            );
        }).catch(function () {
            console.log('叫号失败');
        });
    }
    handleInput (event) {
        this.setState({
            tableID: event.target.value
        })
    }


    handlePause(){
        fetch("/iqesTT/restaurant/configInfo/pause?pause=true",{
            method:'PATCH'
        }).then(function (response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            if(jsonData.ErrorCode === '0'){
                console.log('暂停取号成功');
                message.success('暂停取号成功');
            }
        }).catch(function () {
            console.log('出错了');
        });
    }

    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content className="Call-line">
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2} style={{paddingTop:"5px"}}>输入桌ID号:</Col>
                        <Col span={3}><Input type='input' ref='tableID' placeholder='001' onChange={this.handleInput.bind(this)}/></Col>
                        <Col span={1}></Col>
                        <Col span={2} ><Button type='primary' style={{border:"none",color:"white"}} onClick={this.handleCall.bind(this)}><span className='font-color'>呼叫排号</span></Button></Col>
                        <Col span={5} style={{color:'orange',fontSize:'14px',paddingTop:"8px"}}><Icon type="notification"/>当前叫号:{this.state.orderNumber} 顾客,请到 {this.state.tableNumber} 桌就餐</Col>
                        <Col span={5}></Col>
                        <Col span={3}><Button type='primary'><span className='font-color'>手动叫号拼桌</span></Button></Col>
                        <Col span={2}><Button type='primary' onClick={this.handlePause.bind(this)}><span className='font-color'>暂停取号</span></Button></Col>
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