import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_EXPENSES, GET_ERRORS } from './types';

export const getExpenses = (token) => dispatch => {
  axios.get("/expense/all", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const createExpense = (newExpense, token) => dispatch => {
  axios.post("/expense", newExpense, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
      toast('Added a new expense!', {
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
    })
};