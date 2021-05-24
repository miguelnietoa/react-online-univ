import React from 'react';
import ReactDOM from 'react-dom';
//import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// core components
import SignInSide from 'views/SignIn/SignInSide.js';
import Admin from 'layouts/Admin.js';
import BASE_URL_API from './variables/api.js';
import Provider from './utils/provider.js';
import { PrivateRoute, PublicRoute } from './utils/utils.js';
import 'assets/css/material-dashboard-react.css?v=1.9.0';


axios.defaults.baseURL = BASE_URL_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <Provider>
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/signin" />
      <PublicRoute restricted={true} component={SignInSide} path="/signin" exact />
      <PrivateRoute component={Admin} path="/admin" />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
