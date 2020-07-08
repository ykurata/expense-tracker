import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from  './pages/Dashboard';
import Login from  './pages/Login';
import SignUp from  './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


