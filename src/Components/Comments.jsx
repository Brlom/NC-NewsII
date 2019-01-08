import React, { Component } from 'react';
import * as api from '../api';

class Comments extends Component {
    state = {
        comments: [],
        sortBy: "votes",
    }

    render() {
        const { comments } = this.state;
        const { user } = this.props;
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
                {/* <ul>
                    {comments.map((comment) => {
                        return (
                            <div>
                                <li>{user.username}</li> 
                                <li>{comment.body}</li>
                                <button className="voteButton upVote">⬆</button>
                                <span className="voteCount">0{comments.votes}</span>
                                <button className="voteButton downVote">⬇</button>
                                <li>{comment.created_at}</li>
                            </div>
                        );
                    })}
                </ul>  */}
            </main>
        );
    }

    componentDidMount() {
        this.fetchCommentsByArticle()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic) {
            this.fetchCommentsByArticle()
        }
    }

    fetchCommentsByArticle = () => {
        const { topic } = this.props;
        api.getCommentsByArticleId(topic)
            .then(({ comments }) => {
                this.setState({
                    comments
                })
            })
    }
}

export default Comments;
