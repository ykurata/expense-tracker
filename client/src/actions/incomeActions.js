import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_INCOMES, GET_ERRORS } from './types';

export const getIncomes = (token) => dispatch => {
  axios.get("/income/all", { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
      dispatch({
        type: GET_INCOMES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export const createIncome = (newIncome, token) => dispatch => {
  axios.post("/income", newIncome, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      console.log(res.data);
      toast('Added a new income!', {
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
      });
    });
};