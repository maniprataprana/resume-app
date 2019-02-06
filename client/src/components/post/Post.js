import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}
	render() {
		const { loading, post } = this.props.post;
		let postConent;
		if (post === null || loading || Object.keys(post).length === 0) {
			postConent = <Spinner />;
		} else {
			postConent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light-mb3">
								Back to Feed
							</Link>
							{postConent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};
const mapStateToProps = ({ post }) => ({ post });

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
