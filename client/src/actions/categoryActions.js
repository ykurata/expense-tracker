import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_CATEGORIES, GET_ERRORS } from './types';


export const getCategories = (userId, token) => dispatch => {
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

export const createCategory = (newCategory, token) => dispatch => {
  axios.post("/category", newCategory, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
      toast('Added a new category!', {
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
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const updateCategory = (id, updatedCategory, token) => dispatch => {
  axios.put(`/category/update/${id}`, updatedCategory, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Updated a category!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};