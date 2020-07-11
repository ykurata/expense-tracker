import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'
import expenseReducer from "./expenseReducer";
import incomeReducer from './incomeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  expense: expenseReducer,
  income: incomeReducer
});