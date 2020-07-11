import axios from 'axios';
import { GET_INCOMES } from './types';

const token = localStorage.getItem("token");

export const getIncomes = () => dispatch => {
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