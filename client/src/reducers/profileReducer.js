import isEmpty from '../validations/isEmpty';
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	PROFILE_NOT_FOUND,
	CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: null,
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null
			};

		case GET_PROFILES:
			return {
				...state,
				loading: false,
				profiles: action.payload
			};
		default:
			return state;
	}
};
