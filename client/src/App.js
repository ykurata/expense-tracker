import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Provider } from "react-redux";

import Dashboard from  './pages/Dashboard';
import Login from  './pages/Login';
import SignUp from  './pages/SignUp';
import AllExpenses from './pages/AllExpenses';
import AllIncomes from './pages/AllIncomes';
import AllCategories from './pages/AllCategories';
import EditExpense from './pages/EditExpense';
import EditIncome from './pages/EditIncome';
import EditCategory from './pages/EditCategory';
import PrivateRoute from "./components/PrivateRoute";

import store from './store';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Arial',
  },
});

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
      <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/expenses" component={AllExpenses} />
          <PrivateRoute path="/incomes" component={AllIncomes} />
          <PrivateRoute path="/categories" component={AllCategories} />
          <PrivateRoute path="/expense/edit/:id" component={EditExpense} />
          <PrivateRoute path="/income/edit/:id" component={EditIncome} />
          <PrivateRoute path="/category/edit/:id" component={EditCategory} />
        </Switch>
      </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;


