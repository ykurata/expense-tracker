import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { 
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS } from './types';


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post("/user/register", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      localStorage.setItem('userId', decoded.id);
      // Set token to Auth header
      setAuthToken(token);
      
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post("/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      localStorage.setItem('userId', decoded.id);
      // Set token to Auth header
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
