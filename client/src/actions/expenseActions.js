import axios from 'axios';
import { GET_EXPENSES } from './types';

const token = localStorage.getItem("token");

export const getExpenses = () => dispatch => {
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

export const createExpense = newExpense => dispatch => {
  axios.post("/expense", newExpense, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
};