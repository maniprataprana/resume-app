import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const getErrors = error => ({
	type: GET_ERRORS,
	payload: error
});

export const registerUser = (user, history) => dispatch => {
	axios
		.post('/api/users/register', user)
		.then(result => {
			history.push('/login');
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const loginUser = user => dispatch => {
	axios
		.post('/api/users/login', user)
		.then(result => {
			const { token } = result.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	payload: user
});

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
