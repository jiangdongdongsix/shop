import React, { Component } from 'react';
// import  '../styles/basic.css';
import moment from 'moment';
import { Form, Input, TimePicker, Select,Row, Col,Button,message,Icon} from 'antd';
const FormItem = Form.Item;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const success = () => {
    message.success('保存成功');
};
const error = () => {
    message.error('保存失败');
};

const warning = () => {
    message.warning('This is message of warning');
};


class RegistrationForm extends React.Component {

    //提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values.openTime.format("HH:mm:ss"));
                let info = {
                    name: values.name,
                    detailAddress:values.detailAddress,
                    telephone:values.telephone,
                    endTime:values.endTime.format("HH:mm:ss"),
                    openTime:values.openTime.format("HH:mm:ss"),
                    id:values.id
                };
                fetch('/iqesTT/restaurant/restaurantInfo', {
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
        });
    }

    //初始化数据
    componentDidMount(){
        const formFather = this.props.form ;
        fetch("/iqesTT/restaurant/restaurantInfo")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            if(typeof jsonData.restaurantInfo !== 'undefined'){
                formFather.setFieldsValue({
                    name: jsonData.restaurantInfo.name,
                    detailAddress:jsonData.restaurantInfo.detailAddress,
                    telephone:jsonData.restaurantInfo.telephone,
                    endTime:moment(jsonData.restaurantInfo.endTime, 'HH:mm:ss'),
                    openTime:moment(jsonData.restaurantInfo.openTime, 'HH:mm:ss'),
                    id:jsonData.restaurantInfo.id,
                });
            }

        }).catch(function () {
            console.log('出错了');
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const timeformate = "HH:mm:ss";
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <div className="firstForm">
            <Row className="headerContent">
                {/*<Col span={1}><div className="block"></div></Col>*/}
                <Col span={2}><div className="block"></div><p>门店基本信息</p></Col>
                <Col span={18}><hr/></Col>
                <Col span={4}><Button type="danger" className="save" onClick={this.handleSubmit}>保存</Button></Col>
            </Row>
            <Form onSubmit={this.handleSubmit} className="myForm">
                <FormItem
                    {...formItemLayout}
                    label="门店名称"
                    className="formItem"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入门店名称',
                        }],
                    })(
                        <Input className="input"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店详细地址"
                >
                    {getFieldDecorator('detailAddress', {
                        rules: [{
                            required: true, message: '请输入门店详细地址',
                        }],
                    })(
                        <Input className="input" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店电话"
                >
                    {getFieldDecorator('telephone', {
                        rules: [{
                            required: true, message: '请输入门店电话   ',
                        }],
                    })(
                        <Input className="input" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店开始时间"
                    className="startName"
                >
                    {getFieldDecorator('openTime', config)(
                        <TimePicker format={timeformate} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店结束时间"
                >
                    {getFieldDecorator('endTime', config)(
                        <TimePicker format={timeformate} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="id"
                    className="idName"
                >
                    {getFieldDecorator('id', {
                        rules: [{
                            required: false, message: 'Please input your password!',
                        }],
                    })(
                        <Input className="input" />
                    )}
                </FormItem>
            </Form>
            </div>
        );
    }
}

const BasicInfoForm = Form.create()(RegistrationForm);

export default BasicInfoForm;