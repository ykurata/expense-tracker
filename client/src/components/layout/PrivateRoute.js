import React from 'react';
import {
  Route,
  Redirect
 } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
  )} />
);

export default PrivateRoute;