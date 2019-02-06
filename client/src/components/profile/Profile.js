import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profileAction';

class Profile extends Component {
	componentDidMount() {
		const handle = this.props.match.params.handle;
		if (handle) {
			this.props.getProfileByHandle(handle);
		}
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found')
		}
	}
	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;
		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						education={profile.education}
						experience={profile.experience}
					/>
					{profile.githubusername ? (
						<ProfileGithub username={profile.githubusername} />
					) : null}
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapsStateToProps = ({ profile }) => ({ profile });

export default connect(
	mapsStateToProps,
	{ getProfileByHandle }
)(Profile);
