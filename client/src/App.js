import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";

import Dashboard from  './pages/Dashboard';
import Login from  './pages/Login';
import SignUp from  './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";

import store from './store';

if (localStorage.token) {
  // Set auth token header auth
  const token = localStorage.token;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


