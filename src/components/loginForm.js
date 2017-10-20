import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const JSEncrypt = require("jsencrypt");
const publicKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUMTCZwfbRmX3eGl/Qr+uXpwP6fJZDMoo5qp3q" +
    "6eRCyd4Azdw60qsWqea9Zs9EhJUiErvO6Nn2hWby0cm/FWi5mdCrqGV6KM2LMqFJA4k4WK0sMGS9" +
    "UhPcU/ze4g/R0qA/r2S0O1PxXwJnRZ2Z7amyhkPUbtNXov+ENZZK8cAnVQIDAQAB";

// must be a string. This is hex string. decimal = 65537
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const encrypt = new JSEncrypt.JSEncrypt(); // 实例化加密对象
                encrypt.setPublicKey(publicKey); // 设置公钥
                const encryptoPasswd = encrypt.encrypt(values.password) // 加密明文
                let info = {"loginName": values.userName,"password":encryptoPasswd,"remember":values.remember};
                console.log(info);
                fetch('/shop/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(info)
                }).then(function(response) {
                    return response.json();
                }).then(function (jsonData) {
                    console.log(jsonData);
                    console.log("登录成功");
                }).catch(function () {
                    console.log('出错了');
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住用户和密码</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button  htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    {/*Or <a href="">register now!</a>*/}
                </FormItem>
            </Form>
        );
    }
}

export default NormalLoginForm;