import * as type from './../actions/type';

function cardReducer(state, action) {
    switch (action.type) {
        case type.CHANGE_NAME:
            return {
                name: action.name, // 使用action携带的新name
                picture: state.picture  // 不需要修改，使用旧state的值
            }
        default:
            return state  // 没有匹配的action type，返回原来的state
    }
}

function dialogReducer(state, action) {
    switch (action.type) {
        case type.SHOW_DIALOG:
            return {
                status: true
            }

        case type.CLOSE_DIALOG:
            return {
                status: false
            }

        default:
            return state  // 没有匹配的action type，返回原来的state
    }
}

function reducer(state, action) {
    return {
        card: cardReducer(state.card, action),
        dialog: dialogReducer(state.dialog, action)
    }
}

export default reducer