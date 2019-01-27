import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';
import Votes from '../components/baseComp/Votes';

class Comment extends Component {
    state = {
        comment: this.props.comment,
        sortBy: "votes",
    }

    render() {
        const { comment } = this.state;
        const { article } = this.props;
        return (
            <main>
                <ul>
                    <div key={comment.comment_id}>
                        <img src={comment.avatar_url} alt="Avatar for comment writer" height="30px"></img>
                        <Link to={`/users/${comment.author}`}>{comment.author}</Link>
                        <li>{comment.body}</li>
                        <Votes comment={comment} article={article} elementUpdated={this.commentUpdated} />
                        {" | "}
                        {moment(comment.created_at).fromNow()}
                        {comment.author === this.props.user.username ?
                            <div className="alignDelete" >
                                {" | "}
                                <button className="deleteCommentButton" onClick={this.handleDelete}>Delete</button>
                            </div>
                            : ""
                        }
                        <hr></hr>
                    </div>
                </ul>
            </main>
        );
    }

    handleDelete = () => {
        api.deleteComment(this.props.article.article_id, this.state.comment.comment_id).then(() => {
            this.props.commentDeleted(this.state.comment)
        })
    }
    commentUpdated = comment => {
        this.setState({ comment: comment })
    }
}

export default Comment;
