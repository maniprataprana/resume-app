import React, { Component } from 'react';
import moment from 'react-moment';
import Moment from 'react-moment';

class ProfileCreds extends Component {
	render() {
		const { experience, education } = this.props;
		const experienceItems = experience.map(exp => (
			<li className="list-group-item" key={exp._id}>
				<h4>{exp.company}</h4>
				<p>
					<Moment format="YYYY/MMM/DD">{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MMM/DD">{exp.to}</Moment>
					)}
				</p>
				<p>
					<strong>Position: </strong> {exp.title}
				</p>
				<p>
					{exp.location ? (
						<span>
							<strong>Location: </strong> {exp.location}
						</span>
					) : null}
				</p>
				<p>
					{exp.description ? (
						<span>
							<strong>Description: </strong> {exp.description}
						</span>
					) : null}
				</p>
			</li>
		));

		const educationItems = education.map(edu => (
			<li className="list-group-item" key={edu._id}>
				<h4>{edu.school}</h4>
				<p>
					<Moment format="YYYY/MMM/DD">{edu.from}</Moment> -{' '}
					{edu.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MMM/DD">{edu.to}</Moment>
					)}
				</p>
				<p>
					<strong>Degree: </strong> {edu.degree}
				</p>
				<p>
					<strong>Field: </strong> {edu.fieldofstudy}
				</p>

				<p>
					{edu.description ? (
						<span>
							<strong>Description: </strong> {edu.description}
						</span>
					) : null}
				</p>
			</li>
		));
		return (
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-center text-info">Experience</h3>
					{experienceItems.length > 0 ? (
						<ul className="list-group">{experienceItems}</ul>
					) : (
						<p className="text-center">No experience listed</p>
					)}
				</div>
				<div className="col-md-6">
					<h3 className="text-center text-info">Education</h3>
					{educationItems.length > 0 ? (
						<ul className="list-group">{educationItems}</ul>
					) : (
						<p className="text-center">No education listed</p>
					)}
				</div>
			</div>
		);
	}
}

export default ProfileCreds;
