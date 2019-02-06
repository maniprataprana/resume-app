import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile, getCurrentProfile } from '../../actions/profileAction';

import isEmpty from '../../validations/isEmpty';

class EditProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
        if (nextProps && nextProps.profile && nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			const handle = profile.handle;
			const skills = profile.skills.join(', ');
			const company = !isEmpty(profile.company) ? profile.company : '';
			const website = !isEmpty(profile.website) ? profile.website : '';
			const location = !isEmpty(profile.location) ? profile.location : '';
			const githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			const bio = !isEmpty(profile.bio) ? profile.bio : '';
			const social = !isEmpty(profile.social) ? profile.social : {};
            const status = profile.status;
			const twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			const instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';

			const youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';

			const linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';

			const facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';

			this.setState({
				handle,
				company,
				website,
				location,
				status,
				skills,
				githubusername,
				bio,
				twitter,
				facebook,
				linkedin,
				youtube,
				instagram
			});
		}
	}
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		const {
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubusername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram
		} = this.state;

		const profile = {
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubusername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram
		};
		this.props.createProfile(profile, this.props.history);
	};
	render() {
		const {
			displaySocialInputs,
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubusername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram,
			errors
		} = this.state;

		const options = [
			{
				label: '* Select Professional Status',
				value: '0'
			},
			{
				label: 'Developer',
				value: 'Developer'
			},
			{
				label: 'Junior Developer',
				value: 'Junior Developer'
			},
			{
				label: 'Senior Developer',
				value: 'Senior Developer'
			},
			{
				label: 'Manager',
				value: 'Manager'
			},
			{
				label: 'Student or Learning',
				value: 'Student or Learning'
			},
			{
				label: 'Instructor or Teacher',
				value: 'Instructor'
			},
			{
				label: 'Intern',
				value: 'Intern'
			},
			{
				label: 'Other',
				value: 'Other'
			}
		];

		let socialInputs = displaySocialInputs ? (
			<div>
				<InputGroup
					placeholder="Twitter Profile URL"
					icon="fab fa-twitter"
					name="twitter"
					value={twitter}
					error={errors.twitter}
					onChange={this.onChange}
				/>
				<InputGroup
					placeholder="Facebook Page URL"
					icon="fab fa-facebook"
					name="facebook"
					value={facebook}
					error={errors.facebook}
					onChange={this.onChange}
				/>
				<InputGroup
					placeholder="Linkedin Profile URL"
					icon="fab fa-linkedin"
					name="linkedin"
					value={linkedin}
					error={errors.linkedin}
					onChange={this.onChange}
				/>
				<InputGroup
					placeholder="YouTube Channel URL"
					icon="fab fa-youtube"
					name="youtube"
					value={youtube}
					error={errors.youtube}
					onChange={this.onChange}
				/>
				<InputGroup
					placeholder="Instagram Page URL"
					icon="fab fa-instagram"
					name="instagram"
					value={instagram}
					error={errors.instagram}
					onChange={this.onChange}
				/>
			</div>
		) : null;

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									placeholder="* Profile handle"
									info="A unique handle for your profile URL. Your full name,
										company name, nickname, etc"
									name="handle"
									value={handle}
									error={errors.handle}
									onChange={this.onChange}
								/>

								<SelectListGroup
									options={options}
									name="status"
									value={status}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
									onChange={this.onChange}
								/>

								<TextFieldGroup
									placeholder="Company"
									info="Could be your own company or one you work for"
									name="company"
									value={company}
									error={errors.company}
									onChange={this.onChange}
								/>
								<TextFieldGroup
									placeholder="Website"
									info="Could be your own or a company website"
									name="website"
									value={website}
									error={errors.website}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									placeholder="Location"
									info="City & state suggested (eg. Boston, MA)"
									name="location"
									value={location}
									error={errors.location}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									placeholder="* Skills"
									info="Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP)"
									name="skills"
									value={skills}
									error={errors.skills}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									placeholder="Github Username"
									info="If you want your latest repos and a Github link, include
										your username"
									name="githubusername"
									value={githubusername}
									error={errors.githubusername}
									onChange={this.onChange}
								/>

								<TextAreaFieldGroup
									placeholder="A short bio of yourself"
									info="Tell us a little about yourself"
									name="bio"
									value={bio}
									error={errors.bio}
									onChange={this.onChange}
								/>

								<div className="mb-3">
									<button
										onClick={() =>
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}))
										}
										type="button"
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ errors, profile }) => ({ errors, profile });

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(EditProfile));
