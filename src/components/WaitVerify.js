import React from 'react';
import { Layout,Button,Row,Col,Input } from 'antd';
import VerifyResult  from './VerifyResult';
import MethodVerify from "./MethodVerify";
import HeaderCustom from './HeaderCustom'
const {Content} = Layout;


export default class WaitVerify extends React.Component{
    constructor(){
        super();
        this.state = {
            flag:false,
            data:{}
        }
    }

   changeFlag = (data) => {
       this.setState({
           flag:true,
           data:data});
   }

    render(){
        const {extractFlag} = this.state;
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <MethodVerify onChange={(e) => this.changeFlag(e)}/>
                    {this.state.flag ? <VerifyResult data = {this.state.data}/> : <Row/>}
                </Content>
            </Layout>
        )
    }

}
