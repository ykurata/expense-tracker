import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  GET_EXPENSES, 
  GET_EXPENSE, 
  GET_ERRORS,
} from './types';

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

export const getExpense = (id, token) => dispatch => {
  axios.get(`/expense/get/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      dispatch({
        type: GET_EXPENSE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateExpense = (id, updatedExpense, token) => dispatch => {
  axios.put(`/expense/update/${id}`, updatedExpense, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Updated the expense!', {
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
      });
    });
};

export const deleteExpense = (id, token) => dispatch => {
  axios.delete(`/expense/delete/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Deleted expense!', {
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
    });
};