import axios from 'axios';

import {
	GET_PROFILE,
	GET_PROFILES,
	GET_ERRORS,
	PROFILE_LOADING,
	PROFILE_NOT_FOUND,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER
} from './types';

export const getErrors = error => ({
	type: GET_ERRORS,
	payload: error
});

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(response => {
			dispatch(getProfile(response.data));
		})
		.catch(error => dispatch(getProfile({})));
};

export const setProfileLoading = () => ({
	type: PROFILE_LOADING
});

export const clearCurrentProfile = () => ({
	type: CLEAR_CURRENT_PROFILE
});

export const getProfile = profile => ({
	type: GET_PROFILE,
	payload: profile
});

export const createProfile = (profile, history) => dispatch => {
	axios
		.post('/api/profile', profile)
		.then(response => {
			history.push('/dashboard');
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const deleteAccount = () => dispatch => {
	axios
		.delete('/api/profile')
		.then(response => {
			dispatch({
				type: SET_CURRENT_USER,
				payload: {}
			});
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const addExperience = (experience, history) => dispatch => {
	axios
		.post('/api/profile/experience', experience)
		.then(response => {
			history.push('/dashboard');
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const addEducation = (education, history) => dispatch => {
	axios
		.post('/api/profile/education', education)
		.then(response => {
			history.push('/dashboard');
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const deleteExperience = id => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(response => {
			dispatch(getProfile(response.data));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(response => {
			dispatch(getProfile(response.data));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then(response => {
			console.log(response);
			dispatch(fetchProfiles(response.data));
		})
		.catch(error => dispatch(fetchProfiles(null)));
};

export const getProfileByHandle = handle => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then(response => {
			dispatch(getProfile(response.data));
		})
		.catch(error => dispatch(getProfile(null)));
};

export const fetchProfiles = profiles => ({
	type: GET_PROFILES,
	payload: profiles
});
