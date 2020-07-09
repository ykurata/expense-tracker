import axios from 'axios';
import { LOG_IN } from './types';

export const login = (credential) => dispatch => {
  axios.post("/user/login", credential)
    .then(res => {
      dispatch({
        type: LOG_IN,
        payload: res.data
      });
      console.log("logged in action")
      window.location = "/";
    })
    .catch(err => {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response
      });
    });
}

