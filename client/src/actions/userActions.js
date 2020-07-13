import axios from 'axios';
import { GET_USER } from './types';
import { toast } from 'react-toastify';

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

export const postAvatar = (formData, token) => dispatch => {
  axios.post("/user/avatar", formData, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Saved your profile image!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      window.location.href = "/";
    })
    .catch(err => {
      console.log(err);
    })
};