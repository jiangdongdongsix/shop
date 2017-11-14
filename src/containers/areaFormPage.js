import React,{ Component } from 'react'
import { Layout,Row,Col } from 'antd'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import AreaForm from "../components/areasForm";

class AreaFormPage extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <AreaForm/>
        </Layout>
    }
}


export default AreaFormPage;