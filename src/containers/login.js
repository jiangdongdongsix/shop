import React, { Component } from 'react';
import './../styles/login.css';
import { Row, Col, Form } from 'antd';
import NormalLoginForm from '../components/loginForm';
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
    render() {

        return (
            <div className="conrtainer">
                    <div className="middle">
                        <Row className="rowName">
                            <Col span={12} className="font">
                                <div className="logo">
                                    <div className="name">
                                        <div className="chineseName"><p>排队叫号门店后台管理系统</p></div>
                                        <div className="EnglishName"><p>Queuing store management system background</p></div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} className="loginInput">
                                <WrappedNormalLoginForm />
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>
            </div>
        );
    }
}

export default Login;