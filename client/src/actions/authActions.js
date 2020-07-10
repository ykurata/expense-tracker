import axios from 'axios';
import { LOG_IN, SIGN_UP, GET_ERRORS } from './types';

export const login = (credential) => dispatch => {
  axios.post("/user/login", credential)
    .then(res => {
      dispatch({
        type: LOG_IN,
        payload: res.data
      });
      window.location = "/";
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const signup = (userInput) => dispatch => {
  axios.post("/user/register", userInput)
    .then(res => {
      dispatch({
        type: SIGN_UP,
        payload: res.data
      });
      window.location = "/";
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
