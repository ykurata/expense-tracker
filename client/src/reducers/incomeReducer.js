import { GET_INCOMES } from '../actions/types';

const initialState = {
  incomes: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_INCOMES: 
      return {
        ...state,
        incomes: action.payload
      }
    default: 
      return state;  
  }
}