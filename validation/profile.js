const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
	let errors = {};
	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';
	data.status = !isEmpty(data.status) ? data.status : '';

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = 'Hanlde needs to be between 2 and 4 characters!';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Proifle handle is required!';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Status field is required!';
	}
	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'Skills field is required!';
	}

	if (!isEmpty(data.website) && !Validator.isURL(data.website)) {
		errors.website = 'Not a valid url!';
	}
	if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
        errors.twitter = 'Not a valid url!';
	}
    if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
        errors.facebook = 'Not a valid url!';
	}
    if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) {
        errors.linkedin = 'Not a valid url!';
	}
    if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
        errors.instagram = 'Not a valid url!';
	}
    if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
        errors.youtube = 'Not a valid url!';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
