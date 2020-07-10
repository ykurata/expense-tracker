import axios from 'axios';
import { LOG_IN, AUTH_ERRORS } from './types';

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
        type: AUTH_ERRORS,
        payload: err.response.data
      });
    });
}

