/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';
//import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// core components
import SignInSide from 'views/SignIn/SignInSide.js';
import Admin from 'layouts/Admin.js';
import BASE_URL_API from './variables/api.js';
import { PrivateRoute, PublicRoute } from './utils/utils.js';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

//const hist = createBrowserHistory();

axios.defaults.baseURL = BASE_URL_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';
/* 
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/signin" component={SignInSide} />
      <Route exact path="/admin/dashboard" component={Admin} />
      <Redirect from="/" to="/signin" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
 */

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PublicRoute
        restricted={true}
        component={SignInSide}
        path="/signin"
        exact
      />
      <PrivateRoute component={Admin} path="/admin/dashboard" exact />
      <Redirect from="/" to="/signin" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
