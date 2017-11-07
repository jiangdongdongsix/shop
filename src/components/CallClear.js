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
            callInfo:{
                tableID: '',
                orderNumber: '--',
                tableNumber: '--',
            },
            pauseCall:'',
            pauseState: ''
        }
    }
    //叫号
    handleCall(event){
        let that = this;
        that.setState({
            callInfo:{
                tableID: '',
                orderNumber: '--',
                tableNumber: '--',
            }
        });
        fetch('/iqesTT/queue/arrivingCustomer?tableName='+ this.state.tableID).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            that.setState({callInfo: {
                    orderNumber: jsonData.extractNumber.tableNumber.tableType.tableTypeName + jsonData.extractNumber.id,
                    tableNumber: jsonData.extractNumber.tableNumber.name
                }
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

    //初始化 取号情况
    initData(){
        let that = this;
        fetch("/iqesTT/restaurant/configInfo/pause")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            that.setState({
                pauseState:jsonData.pause,
                pauseCall:jsonData.pause === false ? '暂停取号': '恢复取号'
            });
            console.log(111);
            console.log(jsonData.pause);
        }).catch(function () {
            console.log('出错了');
        });
    }

    //暂停恢复取号
    handlePause(){
        let that = this;
        console.log(111);
        console.log(that.state.pauseState);
        if(that.state.pauseState === false){
            console.log('if');
            fetch("/iqesTT/restaurant/configInfo/pause?pause=true", {
                method: 'PATCH'
            }).then(function (response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData);
                if (jsonData.ErrorCode === '0') {
                    console.log('暂停取号成功');
                    that.setState({
                        pauseCall:'恢复取号',
                        pauseState:true
                    });
                    message.success('暂停取号成功');
                }
            }).catch(function () {
                console.log('出错了');
            })
        }else{
            if(that.state.pauseState === true){
                console.log('else');
                fetch("/iqesTT/restaurant/configInfo/pause?pause=false", {
                    method: 'PATCH'
                }).then(function (response) {
                    return response.json();
                }).then(function (jsonData) {
                    console.log(jsonData);
                    if (jsonData.ErrorCode === '0') {
                        console.log('恢复取号成功');
                        that.setState({
                            pauseCall:'暂停取号',
                            pauseState:false
                        });
                        message.success('恢复取号成功');
                    }
                }).catch(function () {
                    console.log('出错了');
                })
            }
        }

    }
    //table表中的叫号按钮
    handleTableCall(callInfo){
        this.setState({
            callInfo:{
                orderNumber: callInfo.orderNumber,
                tableNumber: callInfo.tableNumber
            }
        });
    }

    componentWillMount(){
        this.initData();
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
                        <Col span={5} style={{color:'orange',fontSize:'14px',paddingTop:"8px"}}><Icon type="notification"/>当前叫号:{this.state.callInfo.orderNumber} 顾客,请到 {this.state.callInfo.tableNumber} 桌就餐</Col>
                        <Col span={5}></Col>
                        <Col span={3}><Button type='primary'><span className='font-color'>手动叫号拼桌</span></Button></Col>
                        <Col span={2}><Button type='primary' onClick={this.handlePause.bind(this)}><span className='font-color'>{this.state.pauseCall}</span></Button></Col>
                    </Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col>
                            <ShowQueue/>
                        </Col>
                    </Row>
                    <Row>
                         <Col>
                            <TableState handleTableCall={this.handleTableCall.bind(this)}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}