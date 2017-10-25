import React,{Component} from 'react';
import {  Switch, Select,Row, Col ,Button,Input,Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ShowConfigForm extends React.Component{
    state = {
        count:3,
        flag:true,
        value: 1,
        styles:{
            color:"white",
            fontSize:"20px"
        }
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        let font = this.state.styles.fontSize;
        this.setState({
            styles:{
                color:e.target.value,
                fontSize:font
            }
        });
    }

    handldeChange= (value) => {
        console.log(`selected ${value}`);
        let color = this.state.styles.color;
        this.setState({
            styles:{
                fontSize:value,
                color:color,
            }
        });
    }

    render() {
        return(
            <div className="firstForm">
                <Row className="headerContent">
                    <Col span={3}><div className="block"></div><p>门店直立机显示播报设置</p></Col>
                    <Col span={17}><hr/></Col>
                    <Col span={4}><Button type="danger" className="save" onClick={this.handleSubmit}>保存</Button></Col>
                </Row>
                <div className="machineConfig">
                    <p>*店家可根据需要，对语音及播报显示进行配置，如未进行配置，即无法提供服务</p>
                    <Row>
                        <Col span={8}>
                            <Row className="Config">
                                <Col span={7}>*语音播报提示配置</Col>
                                <Col span={17}>
                                    <div className="firstRow">每个排队号码，播报次数设置：<Input size="small" value={this.state.count} style={{ width: 50 }}/>次</div>
                                    <div>是否启用 <Switch defaultChecked={this.state.flag} className="switch" />,</div>
                                </Col>
                            </Row>
                            <Row className="Config">
                                <Col span={7}>*播报信息显示配置</Col>
                                <Col span={17}><div className="firstRow">字体大小：
                                    <Select defaultValue="15px" style={{ width: 80 }} onChange={this.handldeChange}>
                                    <Option value="15px">小</Option>
                                    <Option value="20px">正常</Option>
                                    <Option value="32px">大</Option>
                                </Select></div>
                                <div>
                                    字号颜色：  <RadioGroup defaultValue={this.state.styles.backgroundColor} size="large" onChange={this.onChange}>
                                    <RadioButton value="black" className="black"></RadioButton>
                                    <RadioButton value="white" className="white"></RadioButton>
                                    <RadioButton value="dodgerblue" className="blue"></RadioButton>
                                </RadioGroup>
                                </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <div className="exampleShow" style={this.state.styles}>
                                请A01号顾客到03桌位
                            </div>
                        </Col>
                        <Col span={8}>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ShowConfigForm;