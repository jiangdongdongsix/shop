import React,{Component} from 'react';
import {  Switch, Select,Row, Col ,Button,Input,Radio,message } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



const success = () => {
    message.success('保存成功');
};
const error = () => {
    message.error('保存失败');
};

class ReserveTimeConfig extends React.Component{
    state = {
        id:"",
        value: 1,
        extractCount:"",
        reserveTime:"",
    };
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };


    extractCountChange = (e) =>{
        this.setState({
            extractCount:e.target.value,
        });
    }

    reserveTimeChange = (e) =>{
        this.setState({
            reserveTime:e.target.value,
        });
    }

    saveConfig(){
        let that = this;
        let info = {
            extractCount:that.state.extractCount,
            id:that.state.id,
            reservePattern:that.state.value,
            reserveTime:that.state.reserveTime,
        };
        console.log(info);
        fetch('/iqesTT/restaurant/configInfo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log("保存成功")
            success();
        }).catch(function () {
            error();
            console.log('出错了');
        });
    }

    //初始化数据
    componentWillMount(){
        const that = this;
        fetch("/iqesTT/restaurant/configInfo")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            if(jsonData.configInfo.reservePattern == 1){
                that.setState({
                    id:jsonData.configInfo.id,
                    value:jsonData.configInfo.reservePattern,
                    reserveTime:jsonData.configInfo.reserveTime
                });
            }else if(jsonData.configInfo.reservePattern == 2){
                that.setState({
                    id:jsonData.configInfo.id,
                    value:jsonData.configInfo.reservePattern,
                    extractCount:jsonData.configInfo.extractCount
                });
            }else{
                that.setState({
                    id:jsonData.configInfo.id,
                    value:jsonData.configInfo.reservePattern,
                });
            }
        }).catch(function () {
            console.log('出错了');
        });

    }


    render(){
        return(
            <div className="firstForm">
                <Row className="headerContent">
                    <Col span={3}><div className="block"></div><p>排队倒号保留时间设置</p></Col>
                    <Col span={17}><hr/></Col>
                    <Col span={4}><Button type="danger" className="save" onClick={this.saveConfig.bind(this)}>保存</Button></Col>
                </Row>

                <div className="machineConfig">
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={2}>保留号码，逐桌顺延，循环<Input size="small" value={this.state.extractCount} style={{ width: 50 }} onChange={this.extractCountChange} disabled = { this.state.value == 2 ? false : true}/>次后自动取消排号</Radio>
                        <Radio value={3}>被叫号后，保留号码<Input size="small" value={this.state.reserveTime} style={{ width: 50 }} onChange = {this.reserveTimeChange} disabled = { this.state.value == 3 ? false : true}/>分钟</Radio>
                        <Radio value={1}>不顺延，过号作废</Radio>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}

export default ReserveTimeConfig;