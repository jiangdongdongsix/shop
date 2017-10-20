import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import history from './history'
import routes from './routes'
import { createStore,applyMiddleware} from 'redux'
import {Provider,connect } from 'react-redux'

import reducer from './reducers/reducers'


// 创建一个初始化的state
let initState = {
    card: {
        name: 'Jack',
        picture: 'a.jpg'
    },
    dialog: {
        status: false
    }
}

// 创建store
const store = createStore(reducer, initState)

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router history={history}>
                { routes }
            </Router>
        </Provider>
    );
  }
}

export default App;
