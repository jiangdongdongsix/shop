import React,{ Component } from 'react'
import { Layout,Row,Col } from 'antd'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import CallClear from "../components/CallClear";


class CallNumber extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <CallClear/>
        </Layout>
    }
}

export default CallNumber