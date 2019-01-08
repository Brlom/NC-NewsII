import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';

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
                                    <li>{comment.author}</li>
                                    <li>{comment.body}</li>
                                    <button className="voteButton upVote">⬆</button>
                                    <span className="voteCount">{comment.votes}</span>
                                    <button className="voteButton downVote">⬇</button>
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
