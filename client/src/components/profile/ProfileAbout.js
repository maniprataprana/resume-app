import React, { Component } from 'react';
import isEmpty from '../../validations/isEmpty';

class ProfileAbout extends Component {
	render() {
		const { user, skills } = this.props.profile;
		const { name, bio } = user;
		const firstName = name.trim().split(' ')[0];
		const skillsInfo = skills.map((skill, index) => (
			<div className="p-3" key={index}>
				<i className="fa fa-check" /> {skill}
			</div>
		));
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">{`${firstName}'s`} Bio</h3>
                        <p className="lead">{isEmpty(bio) ? <span>{firstName} does not have a  bio.</span> : <span> {bio}</span>}</p>
						<hr />
						<h3 className="text-center text-info">Skill Set</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skillsInfo}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileAbout;
