import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';

class Comments extends Component {
    state = {
        comments: [],
        sortBy: "votes",
        buttonOpen: false,
    }

    render() {
        const { comments, buttonOpen } = this.state;
        const { user } = this.props;
        if (buttonOpen) {
            return (
                <main>
                    <span>{comments.length} Comments </span>
                    <label className="commentsSort">Sort by</label>
                    <select>
                        <option value="author">Author</option>
                        <option value="votes">Votes</option>
                        <option value="created_at">Date</option>
                        <option value="ascending">Sort Ascending</option>
                        <option value="descending">Sort Descending</option>
                    </select>
                    <hr className="commentsHR"></hr>
                    <form>
                        <img src={user.avatar_url} alt="Avatar for logged in user" height="50px"></img>
                        <input type="text" placeholder="leave a comment .."></input>
                    </form>
                    <button type="submit"> Submit >> </button>
                    <hr className="commentsHR"></hr>
                    <ul>
                        {comments.map((comment) => {
                            return (
                                <div key={comment.comment_id}>
                                    <img src={comment.avatar_url} alt="Avatar for comment writer" height="30px"></img>
                                    <Link to={`/users/${comment.author}`}>{comment.author}</Link>
                                    <li>{comment.body}</li>
                                    <button className="voteButton upVote" onClick={this.handleUpVote}>⬆</button>
                                    <span className="voteCount">{comment.votes}</span>
                                    <button className="voteButton downVote" onClick={this.handleDownVote}>⬇</button>
                                    {" | "}
                                    {moment(comment.created_at).fromNow()}
                                    <hr></hr>
                                </div>
                            );
                        })}
                    </ul>
                </main>
            );
        } else {
            return (
                <button type="submit" onClick={this.handleOpenButton}>Load Comments</button>
            );
        }

    }

    componentDidMount() {
        this.fetchCommentsByArticle()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic) {
            this.fetchCommentsByArticle()
        }
    }

    handleOpenButton = (event) => {
        event.preventDefault();
        this.setState({
            buttonOpen: true
        })
    }

    handleUpVote = () => {
        const { article } = this.props;
        const { comments } = this.state;
        api.voteComment(article.article_id, comments.comment_id, 1).then(() => {
            const newComment = this.state.comments;
            newComment.votes += 1;
            this.setState({ comments: newComment })
        })
    }

    handleDownVote = () => {
        const { article } = this.props;
        const { comments } = this.state;
        api.voteComment(article.article_id, comments.comment_id - 1).then(() => {
            const newComment = this.state.comments;
            newComment.votes += -1;
            this.setState({ comments: newComment })
        })
    }

    fetchCommentsByArticle = () => {
        const { article } = this.props;
        api.getCommentsByArticleId(article.article_id)
            .then((comments) => {
                this.setState({
                    comments
                })
            })
    }
}

export default Comments;
