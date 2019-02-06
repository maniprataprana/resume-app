import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, addLike, removeLike } from '../../actions/postAction';
class PostItem extends Component {
	onDelete = id => {
		this.props.deletePost(id);
	};
	onLike = id => {
		this.props.addLike(id);
	};
	onUnLike = id => {
		this.props.removeLike(id);
	};
	findUserLike = likes => {
		const { auth } = this.props;
		if (likes && likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		}
		return false;
	};
	render() {
		const { post, auth, showActions } = this.props;
		const { likes } = post;
		const { avatar, name, text } = post;

		return (
			<div className="posts">
				<div className="card card-body mb-3">
					<div className="row">
						<div className="col-md-2">
							<a href="profile.html">
								<img
									className="rounded-circle d-none d-md-block"
									src={avatar}
									alt={name}
								/>
							</a>
							<br />
							<p className="text-center">{name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{text}</p>
							{showActions && (
								<span>
									<button
										type="button"
										className="btn btn-light mr-1"
										onClick={() => this.onLike(post._id)}
									>
										<i
											className={classnames('fas fa-thumbs-up', {
												'text-info': this.findUserLike(likes)
											})}
										/>
										<span className="badge badge-light">
											{likes && likes.length}
										</span>
									</button>
									<button
										type="button"
										className="btn btn-light mr-1"
										onClick={() => this.onUnLike(post._id)}
									>
										<i className="text-secondary fas fa-thumbs-down" />
									</button>
									<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
										Comments
									</Link>
									{post.user === auth.user.id ? (
										<button
											type="button"
											className="btn btn-danger mr-1"
											onClick={() => this.onDelete(post._id)}
										>
											<i className="fas fa-times" />
										</button>
									) : null}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike }
)(PostItem);
