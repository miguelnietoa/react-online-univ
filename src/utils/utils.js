/**
 * From:
 * https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const isLoggedIn = () => {
  const sendPetition = async () => {
    await axios.get('/students/info', {
      headers: {
        'x-access-token': cookies.get('x-access-token'),
      },
    });
  }
  if (!!cookies.get('x-access-token')) {
    try {
      sendPetition();
      return true;
    } catch (error) {}
  }
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  if  (!isLoggedIn()){
    return <Redirect to="/signin"/>
  }

  return (
    <Route
      {...rest}
      render={(props) => (<Component {...props} />)}
    />
  );
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  if (restricted && isLoggedIn()){
      return <Redirect to="/admin/dashboard" />
  }

  return (
    <Route
      {...rest}
      render={(props) => (<Component {...props} />)}
    />
  );
};

export { isLoggedIn, PrivateRoute, PublicRoute };
