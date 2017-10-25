import React,{Component} from 'react';
import {  Switch, Select,Row, Col ,Button,Input,Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ReserveTimeConfig extends React.Component{
    state = {
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
    render(){
        return(
            <div className="firstForm">
                <Row className="headerContent">
                    <Col span={3}><div className="block"></div><p>排队倒号保留时间设置</p></Col>
                    <Col span={17}><hr/></Col>
                    <Col span={4}><Button type="danger" className="save">保存</Button></Col>
                </Row>

                <div className="machineConfig">
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>保留号码，逐桌顺延，循环<Input size="small" value={this.state.extractCount} style={{ width: 50 }}/>次后自动取消排号</Radio>
                        <Radio value={2}>被叫号后，保留号码<Input size="small" value={this.state.reserveTime} style={{ width: 50 }}/>分钟</Radio>
                        <Radio value={3}>不顺延，过号作废</Radio>
                    </RadioGroup>
                </div>

            </div>
        )
    }
}

export default ReserveTimeConfig;