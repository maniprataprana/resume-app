import React, { Component } from 'react';
import isEmpty from '../../validations/isEmpty';
class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;
		const { user, status, company, location, website, social } = profile;
		const { name, avatar } = user;

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-info text-white mb-3">
						<div className="row">
							<div className="col-4 col-md-3 m-auto">
								<img className="rounded-circle" src={avatar} alt={name} />
							</div>
						</div>
						<div className="text-center">
							<h1 className="display-4 text-center">{name}</h1>
							<p className="lead text-center">
								{status} {isEmpty(company) ? null : <span>at {company}</span>}
							</p>
							<p>{isEmpty(location) ? null : <span> {location}</span>}</p>
							<p>
								{isEmpty(website) ? null : (
									<a className="text-white p-2" href={website} target="_blank">
										<i className="fas fa-globe fa-2x" />
									</a>
								)}

								{!isEmpty(social) && !isEmpty(social.twitter) ? (
									<a
										className="text-white p-2"
										href={social.twitter}
										target="_blank"
									>
										<i className="fab fa-twitter fa-2x" />
									</a>
								) : null}
								{!isEmpty(social) && !isEmpty(social.facebook) ? (
									<a
										className="text-white p-2"
										href={social.facebook}
										target="_blank"
									>
										<i className="fab fa-facebook fa-2x" />
									</a>
								) : null}
								{!isEmpty(social) && !isEmpty(social.linkedin) ? (
									<a
										className="text-white p-2"
										href={social.linkedin}
										target="_blank"
									>
										<i className="fab fa-linkedin fa-2x" />
									</a>
								) : null}
								{!isEmpty(social) && !isEmpty(social.instagram) ? (
									<a
										className="text-white p-2"
										href={social.instagram}
										target="_blank"
									>
										<i className="fab fa-instagram fa-2x" />
									</a>
								) : null}
								{!isEmpty(social) && !isEmpty(social.youtube) ? (
									<a
										className="text-white p-2"
										href={social.youtube}
										target="_blank"
									>
										<i className="fab fa-youtube fa-2x" />
									</a>
								) : null}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileHeader;
