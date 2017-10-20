import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {changeName} from '../actions/actions'
import Card from '../components/Card'
import Dialog from '../components/Dialog'

 class Index extends Component{
    render () {
        return <div className="g-index">
            <Card />
            <Dialog />
            <button onClick={this.props.changeName}>change name</button>
            <button onClick={this.props.showDialog}>show dialog</button>
        </div>
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        changeName () {
            dispatch(changeName('玛丽'))
        },
        showDialog () {
            dispatch({
                type: 'SHOW_DIALOG'
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Index)