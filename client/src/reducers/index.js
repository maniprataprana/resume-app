import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';

const reducers = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer
});

export default reducers;
