import React, { useState, createContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(); 

const AuthContextProvider = (props) => {
	const [state, setState] = useState({
		token: "",
		userId: "",
		validationErrors: [],
		error: ""
	})

	const login = (Credential) => {
		axios.post("/user/login", Credential)
			.then(res => {
				setState({
					token: res.data.token,
					userId: jwt_decode(res.data.token).id
				});
			})
			.catch(err => {
				setState({
					validationErrors: err.response.data,
					error: err.response.data.error
				});
			});
	}

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				userId: state.userId,
				validationErrors: state.validationErrors,
				error: state.error,
				login
			}}
		>
    {props.children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
