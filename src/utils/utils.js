/**
 * From:
 * https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const isLogin = async () => {
  if (!!cookies.get('x-access-token')) {
    try {
      await axios.get('/students/info', {
        headers: {
          'x-access-token': cookies.get('x-access-token'),
        },
      });
      return true;
    } catch (error) {}
  }
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        return isLogin() ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        return isLogin() && restricted ? (
          <Redirect to="/admin/dashboard" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export { isLogin, PrivateRoute, PublicRoute };
