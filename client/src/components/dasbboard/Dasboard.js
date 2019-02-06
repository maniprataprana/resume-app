import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';

import Spinner from '../common/Spinner';

import ProfileActions from './ProfileActions';

import Experience from './Experience';
import Education from './Education';

class Dasboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	onDelete = () => {
		this.props.deleteAccount();
	};
	render() {
		const { user } = this.props.auth;
		const { loading, profile } = this.props.profile;
		let dasboardConent;
		if (profile === null || loading) {
			dasboardConent = <Spinner />;
		} else {
			if (Object.keys(profile).length > 0) {
				dasboardConent = (
					<div>
						<p className="load text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{ marginBottom: '60px' }}>
							<button className="btn btn-danger" onClick={this.onDelete}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				dasboardConent = (
					<div>
						<p className="load text-muted">Welcome {user.name}</p>
						<p>You have not yet setup your profile. Please add some info.</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dasboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="diplay-4">Dashboard</h1>
							{dasboardConent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ profile, auth }) => ({ profile, auth });

Dasboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dasboard);
