import React,{ Component } from 'react'
import { Layout,Row,Col } from 'antd'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import TableTypeForm from "../components/tabletypeFormN";

class tableTyplePage extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <TableTypeForm/>
        </Layout>
    }
}


export default tableTyplePage;