import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute } from 'react-router'
import history from './history'
import routes from './routes'
import './index.css'
import { createStore,applyMiddleware} from 'redux'
import {Provider,connect } from 'react-redux'

import combineReducers from './reducers/reducers'
import initState from './store/store';

// 创建store
const store = createStore(combineReducers, initState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            { routes }
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
