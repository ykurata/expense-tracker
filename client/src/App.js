import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from  './components/pages/Dashboard';
import Login from  './components/pages/Login';
import SignUp from  './components/pages/SignUp';

import AuthContextProvider from './components/contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
