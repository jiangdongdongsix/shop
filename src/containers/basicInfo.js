import React, { Component } from 'react';
import Side from '../components/SideBar';
// import '../styles/sidebar.css';
import { Layout,Row,Col } from 'antd';
import BasicContent from './../components/basic';
import 'whatwg-fetch';
class BasicInfo extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider">
            <Side />
            <BasicContent />
        </Layout>
    }
}

export default BasicInfo;