import axios from 'axios';

export const login = (credential) => dispatch => {
  axios.post("/user/login", credential)
    .then(res => {
      dispatch({
        type: LOG_IN,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response
      });
    });
}

