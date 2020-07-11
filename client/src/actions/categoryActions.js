import axios from 'axios';
import { GET_CATEGORIES } from './types';

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

export const getCategories = () => dispatch => {
  axios.get(`/category/all/${userId}`, { headers: {"Authorization":`Bearer ${token}` }})
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

