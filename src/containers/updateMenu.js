import React,{ Component } from 'react'
import { Layout,Row,Col } from 'antd'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import SetMenu from "../components/UpdateMenu";

class UpdateMenu extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <SetMenu/>
        </Layout>
    }
}


export default UpdateMenu