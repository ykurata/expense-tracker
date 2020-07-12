import axios from 'axios';
import { GET_USER } from './types';

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

export const getUser = () => dispatch => {
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

export const postAvatar = image => dispatch => {
  axios.post("/avatar", image, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
};