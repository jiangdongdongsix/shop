import React from 'react'
import { connect } from 'react-redux'

const Card = (props) => {
    return <div className="m-card">
        <div>
            姓名：{props.name}
        </div>
        <div>
            照片：{props.picture}
        </div>
    </div>
}

function mapStateToProps(state) {
    var info = state.card

    return {
        name: info.name,
        picture: info.picture
    }
}

export default connect(mapStateToProps)(Card)