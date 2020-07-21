import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_INCOMES, GET_INCOME, GET_ERRORS } from './types';

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

export const getIncome = (id, token) => dispatch => {
  axios.get(`/income/get/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      dispatch({
        type: GET_INCOME,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateIncome = (id, updatedIncome, token) => dispatch => {
  axios.put(`/income/update/${id}`, updatedIncome, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Updated the income!', {
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

export const deleteIncome = (id, token) => dispatch => {
  axios.delete(`/income/delete/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      toast('Deleted income!', {
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