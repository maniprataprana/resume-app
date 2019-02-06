const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { promisify } = require('es6-promisify');
const to = require('await-to-js').default;

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();
const validatePostInput = require('../../validation/post');

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			avatar: req.body.avatar,
			name: req.body.name,
			user: req.user.id
		});

		const [err, post] = await to(newPost.save());

		if (post) {
			return res.json(post);
		}

		errors.posts = 'Error saving post!';
		return res.status(400).json(errors);
	}
);

router.get('/', async (req, res) => {
	const errors = {};
	const [err, posts] = await to(Post.find().sort({ date: -1 }));

	if (posts) {
		return res.json(posts);
	}

	errors.nopostfound = 'No posts!';
	return res.status(400).json(errors);
});

router.get('/:id', async (req, res) => {
	const errors = {};
	const [err, post] = await to(Post.findById(req.params.id));
	if (post) {
		return res.json(post);
	}

	errors.nopostfound = 'No post found with that id!';
	return res.status(400).json(errors);
});

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const errors = {};
		const [err0, profile] = await to(Profile.findOne({ user: req.user.id }));
		if (profile) {
			const [err1, post] = await to(Post.findById(req.params.id));

			if (err1 || !post) {
				errors.postnotfound = 'No post found with that id!';
				return res.status(400).json(errors);
			}

			if (post.user.toString() !== req.user.id) {
				errors.notauthorized = 'User not authorized!';
				return res.status(401).json(errors);
			}

			const [err2, deletedPost] = await to(post.remove());
			if (!err2) {
				return res.json({ success: true });
			}
		}

		errors.notauthorized = 'User not authorized';
		return res.status(401).json(errors);
	}
);

router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const errors = {};
		const [err, profile] = await to(Profile.findOne({ user: req.user.id }));
		if (profile) {
			const [err0, post] = await to(Post.findById(req.params.id));
			if (post) {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length > 0
				) {
					errors.alreadyliked = 'User already liked!';
					return res.status(400).json(errors);
				}

				post.likes.unshift({ user: req.user.id });
				const [err1, liked] = await to(post.save());
				if (!err1) {
					return res.json(post);
				}
			}

			errors.postnotfound = 'Post not found!';
			res.status(400).json(errors);
		}
		errors.notauthorized = 'User not authorized';
		return res.status(401).json(errors);
	}
);

router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const errors = {};
		const [err, profile] = await to(Profile.findOne({ user: req.user.id }));
		if (profile) {
			const [err0, post] = await to(Post.findById(req.params.id));
			if (post) {
				if (
					post.likes.filter(like => like.user.toString() === req.user.id)
						.length === 0
				) {
					errors.notliked = 'You have not liked this post!';
					return res.status(400).json(errors);
				}

				const removeIndex = post.likes
					.map(like => like.user.toString())
					.indexOf(req.user.id);
				post.likes.splice(removeIndex, 1);

				const [err1, liked] = await to(post.save());

				if (!err1) {
					return res.json(post);
				}
			}
			errors.postnotfound = 'Post not found!';
			res.status(400).json(errors);
		}
		errors.notauthorized = 'User not authorized';
		return res.status(401).json(errors);
	}
);

router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const [err, post] = await to(Post.findById(req.params.id));
		if (post) {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);

			const [err0, savedPost] = await to(post.save());

			if (!err0) {
				return res.json(savedPost);
			}
		}

		errors.postnotfound = 'No post found with that id!';
		return res.status(400).json(errors);
	}
);

router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const errors = {};
		const [err, post] = await to(Post.findById(req.params.id));
		if (post) {
			if (
				post.comments.filter(
					comment => comment._id.toString() === req.params.comment_id
				).length === 0
			) {
				errors.commentnotexists = 'Comment not found!';
				return res.status(404).json(errors);
			}

			const removeIndex = post.comments
				.map(comment => comment._id.toString())
				.indexOf(req.params.comment_id);

			if (removeIndex === -1) {
				errors.commentnotexists = 'Comment not found!';
				return res.status(404).json(errors);
			}

			post.comments.splice(removeIndex, 1);

			const [err0, savedPost] = await to(post.save());

			if (!err0) {
				return res.json(savedPost);
			}
		}
		errors.postnotfound = 'No post found with that id!';
		return res.status(400).json(errors);
	}
);
module.exports = router;
