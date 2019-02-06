import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postAction';
class CommentForm extends Component {
	state = {
		text: '',
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

	onSubmit = e => {
		e.preventDefault();

		const { postId } = this.props;
		const { name, avatar } = this.props.auth.user;
		const text = this.state.text;
		const comment = {
			text,
			name,
			avatar
		};
		this.props.addComment(postId, comment);
		this.setState({ text: '', errors: {} });
	};

	render() {
		const { text, errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						make a comment...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<TextAreaFieldGroup
								placeholder="Reply to post"
								value={text}
								onChange={this.onChange}
								error={errors.text}
								name="text"
							/>

							<button type="submit" className="btn btn-dark">
								Reply
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });
export default connect(
	mapStateToProps,
	{ addComment }
)(CommentForm);
