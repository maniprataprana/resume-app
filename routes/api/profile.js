const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { promisify } = require('es6-promisify');
const to = require('await-to-js').default;

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

router.get(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const errors = {};
		const [err, profile] = await to(
			Profile.findOne({ user: req.user.id }).populate('user', [
				'name',
				'avatar'
			])
		);

		if (!profile) {
			errors.noprofile = 'No profile exists for this user!';
			return res.status(404).json(errors);
		}
		if (profile) {
			return res.json(profile);
		}

		errors.noprofile = 'Error fetching profile for this user!';
		return res.status(400).json(errors);
	}
);

router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const profileFields = {};

		profileFields.user = req.user._id;
		if (req.body.handle) {
			profileFields.handle = req.body.handle;
		}
		if (req.body.company) {
			profileFields.company = req.body.company;
		}
		if (req.body.website) {
			profileFields.website = req.body.website;
		}
		if (req.body.location) {
			profileFields.location = req.body.location;
		}
		if (req.body.bio) {
			profileFields.bio = req.body.bio;
		}
		if (req.body.status) {
			profileFields.status = req.body.status;
		}
		if (req.body.githubusername) {
			profileFields.githubusername = req.body.githubusername;
		}
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		profileFields.social = {};
		if (req.body.youtube) {
			profileFields.social.youtube = req.body.youtube;
		}
		if (req.body.facebook) {
			profileFields.social.facebook = req.body.facebook;
		}
		if (req.body.twitter) {
			profileFields.social.twitter = req.body.twitter;
		}
		if (req.body.linkedin) {
			profileFields.social.linkedin = req.body.linkedin;
		}
		if (req.body.instagram) {
			profileFields.social.instagram = req.body.instagram;
		}

		const [err, profile] = await to(Profile.findOne({ user: req.user._id }));
		if (profile) {
			const [err1, updatedProfile] = await to(
				Profile.findOneAndUpdate(
					{ user: req.user._id },
					{
						$set: profileFields
					},
					{
						new: true
					}
				)
			);

			if (updatedProfile) {
				console.log('profile');
				return res.json(profile);
			}
		} else if (!err && !profile) {
			const [err2, existingProfile] = await to(
				Profile.findOne({ handle: profileFields.handle })
			);

			if (existingProfile) {
				errors.handle = 'Handle alreday exists!';
				return res.status(400).json(errors);
			}

			const [err3, savedProfile] = await to(new Profile(profileFields).save());

			if (savedProfile) {
				res.json(savedProfile);
			}
		}

		errors.noprofile = 'Error in updating/saving profile!';
		return res.status(400).json(errors);
	}
);

router.get('/handle/:handle', async (req, res) => {
	const errors = {};

	const [err, profile] = await to(
		Profile.findOne({ handle: req.params.handle }).populate('user', [
			'name',
			'avatar'
		])
	);

	if (!profile) {
		errors.noprofile = 'No profile exists for this user!';
		return res.status(404).json(errors);
	}

	if (err) {
		errors.noprofile = 'Error fetching profile for this user!';
		return res.status(404).json(errors);
	}
	return res.json(profile);
});

router.get('/user/:id', async (req, res) => {
	const errors = {};
	const [err, profile] = await to(
		Profile.findOne({ user: req.params.id }).populate('user', [
			'name',
			'avatar'
		])
	);

	if (!profile) {
		errors.noprofile = 'No profile exists for this user!';
		return res.status(404).json(errors);
	}

	if (err) {
		errors.noprofile = 'Error fetching profile for this user!';
		return res.status(404).json(errors);
	}
	return res.json(profile);
});

router.get('/all', async (req, res) => {
	const errors = {};

	const [err, profiles] = await to(
		Profile.find().populate('user', ['name', 'avatar'])
	);

	if (!profiles || profiles.length === 0) {
		errors.noprofiles = 'No profiles available!';
		return res.status(404).json(errors);
	}
	if (err) {
		errors.noprofiles = 'Error fetching profiles!';
		return res.status(404).json(errors);
	}
	return res.json(profiles);
});

router.post(
	'/experience',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const [err, profile] = await to(Profile.findOne({ user: req.user._id }));

		if (err) {
			errors.experience = 'Error fetching experience details for this user!';
			return res.status(400).json(errors);
		}

		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		profile.experience.unshift(newExp);
		const [err0, savedProfile] = await to(profile.save());

		if (err0) {
			errors.experience = 'Error saving experience for this user!';
			return res.status(400).json(errors);
		}
		return res.json(savedProfile);
	}
);

router.delete(
	'/experience/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const errors = {};
		const [err, profile] = await to(Profile.findOne({ user: req.user.id }));
		if (err) {
			errors.noprofiles = 'Error fetching profile!';
			return res.status(400).json(errors);
		}

		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.id);

		if (removeIndex === -1) {
			errors.experience = 'Error fetching experience for this user!';
			return res.status(400).json(errors);
		}
		profile.experience.splice(removeIndex, 1);

		const [err0, savedProfile] = await to(profile.save());
		if (err0) {
			errors.experience = 'Error saving experience for this user!';
			return res.status(400).json(errors);
		}
		return res.json(savedProfile);
	}
);

router.post(
	'/education',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const [err, profile] = await to(Profile.findOne({ user: req.user._id }));

		if (err) {
			errors.education = 'Error fetching education details for this user!';
			return res.status(400).json(errors);
		}

		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldofstudy: req.body.fieldofstudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		profile.education.unshift(newEdu);

		const [err0, savedProfile] = await to(profile.save());

		if (err0) {
			errors.education = 'Error saving education details for this user!';
			return res.status(400).json(errors);
		}

		return res.json(savedProfile);
	}
);

router.delete(
	'/education/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const errors = {};
		const [err, profile] = await to(Profile.findOne({ user: req.user.id }));

		if (err) {
			errors.noprofiles = 'Error fetching profile!';
			return res.status(400).json(errors);
		}
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.id);

		if (removeIndex === -1) {
			errors.education = 'Error fetching experience for this user!';
			return res.status(400).json(errors);
		}
		profile.education.splice(removeIndex, 1);

		const [err0, savedProfile] = await to(profile.save());
		if (err0) {
			errors.education = 'Error saving education for this user!';
			return res.status(400).json(errors);
		}
		return res.json(savedProfile);
	}
);

router.delete(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	async(req, res) => {
		const errors = {};
		const [err, profile] = await to(
			Profile.findOneAndRemove({ user: req.user.id })
		);
		if (err) {
			errors.profile = 'Error deleting profile for this user!';
			return res.status(400).json(errors);
		}

		if (profile) {
			const [err, profile] = await to(
				User.findOneAndRemove({ _id: req.user.id })
			);

			if (!err) {
				res.json({ success: true});
			}
		}
		return res.status(400).json(errors);
	}
);

module.exports = router;
