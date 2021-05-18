import React,{ useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Context } from './utils/provider.js';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, setState] = useContext(Context)
  const { isLoggedIn } = state;

  if (!isLoggedIn) {
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const [state, setState] = useContext(Context)
  const { isLoggedIn } = state;

    if (restricted && isLoggedIn) {
      return <Redirect to="/admin/dashboard" />
    }
  

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default { PrivateRoute, PublicRoute };
