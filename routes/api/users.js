const express = require('express');
const bcrypt = require('bcryptjs');
const gravtar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { promisify } = require('es6-promisify');
const to = require('await-to-js').default;

const User = require('../../models/User');
const keys = require('../../config/keys');
const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const [err0, user] = await to(User.findOne({ email: req.body.email }));
	if (user) {
		errors.email = 'Email already exists!';
		return res.status(400).json(errors);
	}

	const avatar = gravtar.url(req.body.email, {
		s: '200',
		rating: 'pg',
		default: 'mm'
	});
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		avatar,
		password: req.body.password
	});

	const genSalt = promisify(bcrypt.genSalt, bcrypt);
	const [err1, salt] = await to(genSalt(10));
	if (err1) {
		return res.status(400).json(error);
	}

	const hash = promisify(bcrypt.hash, bcrypt);
	const [err2, hashedPassord] = await to(hash(newUser.password, salt));
	if (err2) {
		return res.status(400).json(error);
	}

	newUser.password = hashedPassord;
	const [err3, savedUser] = await to(newUser.save());

	if (err3) {
		return res.status(400).json(error);
	}
	if (savedUser) {
		return res.json(savedUser);
	}
});

router.post('/login', async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	const [err1, user] = await to(User.findOne({ email }));

	if (!user) {
		errors.email = 'User not found!';
		return res.status(404).json(errors);
	}

	const compare = promisify(bcrypt.compare, bcrypt);
	const [err2, isMatch] = await to(compare(password, user.password));

	if (isMatch) {
		const payload = {
			id: user._id,
			name: user.name,
			avatar: user.avatar
		};

		const sign = promisify(jwt.sign, jwt);
		const [err3, token] = await to(
			sign(payload, keys.secretOrKey, { expiresIn: 3600 })
		);

		if (token) {
			return res.json({ success: true, token: 'Bearer ' + token });
		}
	} else {
		errors.password = 'Invalid password!';
		return res.status(400).json(errors);
	}

	errors.password = 'Error validating password!';
	return res.status(400).json(errors);
});

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { _id, email, name } = req.user;
		res.json({
			_id,
			email,
			name
		});
	}
);
module.exports = router;
