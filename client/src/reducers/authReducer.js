import jwt_decode from "jwt-decode";

const initailState = {
  token: "",
  userId: ""
}

export default function(state = initailState, action){
  switch(action.type) {
    case 'LOG_IN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', jwt_decode(action.payload.token).id); 
      console.log("reducer")
      return {
        ...state,
        token: action.payload.token,
        userId: jwt_decode(action.payload.token).id,
      }
    default: 
      return state;  
  }
}