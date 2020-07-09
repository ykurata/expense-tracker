import jwt_decode from "jwt-decode";

const initailState = {
  token: "",
  userId: ""
}


export const authReducer = (state = initailState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id 
      }
    default: 
      return state;  
  }
}