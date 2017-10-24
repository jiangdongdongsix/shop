import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import Index from './containers/index'
import CallNumber from "./containers/callNumber";
import Login from './containers/login';
import Verify from './containers/waitVerify';


const routes = (
<div style={{height:'100%'}}>
  <Route exact path='/' component={Login} />
  <Route path='/callnumber' component={CallNumber} />
  <Route path='/verify' component={Verify} />
</div>
);

export default routes
