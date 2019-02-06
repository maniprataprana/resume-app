import axios from 'axios';
import {
	GET_POST,
	GET_POSTS,
	ADD_POST,
	DELETE_POST,
	POST_LOADING,
	GET_ERRORS,
	CLEAR_ERRORS
} from './types';

export const getErrors = error => ({
	type: GET_ERRORS,
	payload: error
});

export const savePost = payload => ({
	type: ADD_POST,
	payload
});

export const addPost = post => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', post)
		.then(response => {
			dispatch(savePost(response.data));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(response => {
			dispatch(fetchPosts(response.data));
		})
		.catch(error => dispatch(fetchPosts(null)));
};

export const fetchPosts = payload => ({
	type: GET_POSTS,
	payload
});

export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(response => {
			dispatch(removePost(id));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const removePost = payload => ({
	type: DELETE_POST,
	payload
});

export const setPostLoading = () => ({
	type: POST_LOADING
});

export const clearErrors = () => ({
	type: CLEAR_ERRORS
});
export const addLike = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(response => {
			dispatch(getPosts());
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const removeLike = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(response => {
			dispatch(getPosts());
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(response => {
			dispatch(fetchPost(response.data));
		})
		.catch(error => dispatch(fetchPost(null)));
};

export const fetchPost = payload => ({
	type: GET_POST,
	payload
});

export const addComment = (id, comment) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${id}`, comment)
		.then(response => {
			dispatch(fetchPost(response.data));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};

export const deleteComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(response => {
			dispatch(fetchPost(response.data));
		})
		.catch(error => dispatch(getErrors(error.response.data)));
};
