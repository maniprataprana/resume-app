import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import isEmpty from '../../validations/isEmpty';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		const { user, status, company, location, handle, skills } = profile;
		const { name, avatar } = user;
		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img className="rounded-circle" src={avatar} alt="" />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{name}</h3>
						<p>
							{status} {isEmpty(company) ? null : <span>at {company}</span>}
						</p>
						<p>{isEmpty(location) ? null : <span> {location}</span>}</p>
						<Link to={`/profile/${handle}`} className="btn btn-info">
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-lg-block">
						<h4>Skill Set</h4>
						<ul className="list-group">
							{skills.slice(0, 4).map((skill, index) => (
								<li className="list-group-item" key={index}>
									<i className="fa fa-check pr-1" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};
export default ProfileItem;
