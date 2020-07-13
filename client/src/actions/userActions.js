import axios from 'axios';
import { GET_USER } from './types';

export const getUser = (userId, token) => dispatch => {
  axios.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    }) ;
};

export const postAvatar = (image, token) => dispatch => {
  axios.post("/avatar", image, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
};