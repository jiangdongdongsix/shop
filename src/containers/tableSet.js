import React,{ Component } from 'react'
import { Layout,Row,Col } from 'antd'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import Tableset from "../components/TableSet";

class Table extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <Tableset/>
        </Layout>
    }
}


export default Table