import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Row,Col } from 'antd'
import {changeName} from '../actions/actions'
import Side from '../components/SideBar'
import '../styles/sidebar.css'
import WaitVerify from "../components/WaitVerify";

class Demo extends Component{
    render () {
        return <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider sideBgColor">
            <Side/>
            <WaitVerify/>
        </Layout>
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        changeName () {
            dispatch(changeName('玛丽2号'))
        },
        showDialog () {
            dispatch({
                type: 'SHOW_DIALOG'
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Demo)