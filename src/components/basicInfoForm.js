import React, { Component } from 'react';
// import  '../styles/basic.css';
import { Form, Input, TimePicker, Select,Row, Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,

    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }


    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
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
                    hasFeedback
                    className="formItem"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input className="input"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店详细地址"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }],
                    })(
                        <Input className="input" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店电话"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
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
                    {getFieldDecorator('time-picker', config)(
                        <TimePicker />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="门店结束时间"
                >
                    {getFieldDecorator('time-picker', config)(
                        <TimePicker />
                    )}
                </FormItem>
                {/*<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>*/}
                    {/*{getFieldDecorator('agreement', {*/}
                        {/*valuePropName: 'checked',*/}
                    {/*})(*/}
                        {/*<Checkbox>I have read the <a>agreement</a></Checkbox>*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem {...tailFormItemLayout}>*/}
                    {/*<Button type="primary" htmlType="submit" size="large">Register</Button>*/}
                {/*</FormItem>*/}
            </Form>
            </div>
        );
    }
}

const BasicInfoForm = Form.create()(RegistrationForm);

export default BasicInfoForm;