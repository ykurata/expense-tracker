import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from  './components/pages/Login';
import SignUp from  './components/pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
