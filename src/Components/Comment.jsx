import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';

class Comment extends Component {
    state = {
        comment: this.props.comment,
        sortBy: "votes",
        currentVotes: 0,
    }

    render() {
        const { comment, currentVotes } = this.state;
        const { article } = this.props;
        return (
            <main>
                <ul>
                    <div key={comment.comment_id}>
                        <img src={comment.avatar_url} alt="Avatar for comment writer" height="30px"></img>
                        <Link to={`/users/${comment.author}`}>{comment.author}</Link>
                        <li>{comment.body}</li>
                        <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id, comment.comment_id)} disabled={currentVotes === 1}>⬆</button>
                        <span className="voteCount">{comment.votes}</span>
                        <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id, comment.comment_id)} disabled={currentVotes === -1}>⬇</button>
                        {" | "}
                        {moment(comment.created_at).fromNow()}
                        {" | "}
                        {comment.author === this.props.user.username ?
                            <button onClick={this.handleDelete}>Delete</button>
                            : ""
                        }
                        <hr></hr>
                    </div>
                </ul>
            </main>
        );
    }

    handleUpVote = (article_id, comment_id) => {
        const { currentVotes } = this.state;
        api.voteComment(article_id, comment_id, 1).then(() => {
            const newComment = this.state.comments;
            newComment.votes += 1;
            this.setState({ comments: newComment, currentVotes: currentVotes + 1 })
        })
    }

    handleDownVote = (article_id, comment_id) => {
        const { currentVotes } = this.state;
        api.voteComment(article_id, comment_id, - 1).then(() => {
            const newComment = this.state.comments;
            newComment.votes += -1;
            this.setState({ comments: newComment, currentVotes: currentVotes - 1 })
        })
    }

    handleDelete = () => {
        api.deleteComment(this.props.article.article_id, this.state.comment.comment_id).then(() => {
            this.props.commentDeleted(this.state.comment)
        })
    }

}

export default Comment;
