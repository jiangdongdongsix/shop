import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import BasicInfo from './containers/basicInfo';
import CallNumber from "./containers/callNumber";
import Login from './containers/login';
import Verify from './containers/waitVerify';
import Menu from './containers/updateMenu';
import Table from './containers/tableSet';
import tableTyplePage from './containers/tableTyplePage';
import AreaFormPage from './containers/areaFormPage';



const routes = (
        <div style={{height:'100%'}}>
          <Route exact path='/' component={Login} />
          <Route path='/callnumber' component={CallNumber} />
          <Route path='/verify' component={Verify} />
          <Route path='/basicInfo' component={BasicInfo} />
          <Route path='/menu' component={Menu} />
          <Route path='/tableset' component={Table} />
          <Route path='/tabletype' component={tableTyplePage} />
          <Route path="/area" component = {AreaFormPage}/>
        </div>
);

export default routes
