import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';

class Comment extends Component {
    state = {
        comment: [],
        sortBy: "votes",
        currentVotes: 0,
    }

    render() {
        const { comments, currentVotes } = this.state;
        const { comment, article, buttonOpen } = this.props;
        if (buttonOpen) {
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
                            {moment(comments.created_at).fromNow()}
                            <hr></hr>
                        </div>
                    </ul>
                </main>
            );
        } else {
            return (
                <span></span>
            );
        }
    }

    handleUpVote = (article_id, comment_id) => {
        // console.log(article_id);
        // console.log(comment_id);
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

}

export default Comment;
