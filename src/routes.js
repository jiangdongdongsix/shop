import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import Index from './containers/index'
import Demo from "./containers/demo";
import Login from './containers/login';


const routes = (
<div style={{height:'100%'}}>
  <Route exact path='/' component={Login} />
  <Route path='/demo' component={Demo} />
</div>
);

export default routes
