import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'

export default combineReducers({
  login: authReducer,
  errors: errorReducer
});