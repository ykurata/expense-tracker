import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from  './pages/Dashboard';
import Login from  './pages/Login';
import SignUp from  './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


