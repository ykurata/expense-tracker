import { 
  GET_EXPENSES, 
  GET_EXPENSE,
} from '../actions/types';

const initialState = {
  expenses: [],
  expense: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_EXPENSES: 
      return {
        ...state,
        expenses: action.payload
      }
    case GET_EXPENSE:
      return {
        ...state,
        expense: action.payload
      }  
    default: 
      return state;  
  }
}