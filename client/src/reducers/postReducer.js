import {
	GET_POST,
	GET_POSTS,
	ADD_POST,
	DELETE_POST,
	POST_LOADING
} from '../actions/types';
const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};

		case POST_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};

		case DELETE_POST:
			const posts = state.posts.filter(post => post._id !== action.payload);
			return {
				...state,
				posts,
				loading: false
			};

		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		default:
			return state;
	}
};