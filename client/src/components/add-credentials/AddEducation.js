import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { addEducation } from '../../actions/profileAction';

class AddEducation extends Component {
	state = {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
		disabled: false,
		errors: {}
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = this.state;
		const education = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};
		this.props.addEducation(education, this.props.history);
	};
	render() {
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
			disabled,
			errors
		} = this.state;

		return (
			<div className="section add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Your Education</h1>
							<p className="lead text-center">
								Add any school/bootcamp etc that you have attended
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									error={errors.school}
									name="school"
									placeholder="* School"
									value={school}
									onChange={this.onChange}
								/>
								<TextFieldGroup
									error={errors.degree}
									name="degree"
									placeholder="* Degree"
									value={degree}
									onChange={this.onChange}
								/>
								<TextFieldGroup
									error={errors.fieldofstudy}
									name="fieldofstudy"
									placeholder="Field of Study"
									value={fieldofstudy}
									onChange={this.onChange}
								/>

								<h6>From Date</h6>

								<TextFieldGroup
									type="date"
									error={errors.from}
									name="from"
									value={from}
									onChange={this.onChange}
								/>

								<h6>To Date</h6>
								<TextFieldGroup
									type="date"
									error={errors.to}
									name="to"
									value={to}
									onChange={this.onChange}
									disabled={disabled ? 'disabled' : ''}
								/>

								<div className="form-check mb-4">
									<input
										className="form-check-input"
										type="checkbox"
										name="current"
										value={current}
										onChange={this.onCheck}
										checked={current}
										id="current"
									/>
									<label className="form-check-label" htmlFor="current">
										Current Class
									</label>
								</div>

								<TextAreaFieldGroup
									placeholder="Program Description"
									info="Tell us about your program"
									name="description"
									value={description}
									error={errors.description}
									onChange={this.onChange}
								/>

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ errors, profile }) => ({ errors, profile });

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
