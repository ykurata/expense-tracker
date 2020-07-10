import { LOG_IN, SIGN_UP } from '../actions/types';
import jwt_decode from "jwt-decode";

const initailState = {
  token: "",
  userId: ""
}

export default function(state = initailState, action){
  switch(action.type) {
    case LOG_IN:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', jwt_decode(action.payload.token).id); 
      console.log(...state);
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id,
      }
    case SIGN_UP:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', jwt_decode(action.payload.token).id);
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id,
      }
    default: 
      return state;  
  }
}