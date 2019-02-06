import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.errors) {
			this.setState({
				errors: nextProps.errors
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
		const { name, email, password, password2 } = this.state;
		const user = { name, email, password, password2 };
		this.props.registerUser(user, this.props.history);
	};

	render() {
		const { name, email, password, password2, errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevSocial account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="text"
									error={errors.name}
									name="name"
									placeholder="Name"
									value={name}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									type="email"
									error={errors.email}
									name="email"
									placeholder="Email Address"
									value={email}
									info="This site uses Gravatar so if you want a profile image, use
										a Gravatar email"
									onChange={this.onChange}
								/>

								<TextFieldGroup
									type="password"
									error={errors.password}
									name="password"
									placeholder="Password"
									value={password}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									type="password"
									error={errors.password2}
									name="password2"
									placeholder="Confirm Password"
									value={password2}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth, errors }) => ({
	auth,
	errors
});
export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
