import React, { Component } from 'react';
import * as api from '../../api';

class CommentForm extends Component {
    state = {
        orderingValue: this.props.commentSortBy,
        orderDirection: this.props.commentOrderDirection,
        commentBody: "",
    }
    render() {
        const { user, comments } = this.props;
        return (
            <main>
                <span>{comments.length} Comments </span>
                <label className="commentsSort">Sort by</label>
                <select value={this.state.orderingValue} onChange={this.handleOrderChange}>
                    <option value="author">Author</option>
                    <option value="votes">Votes</option>
                    <option value="created_at">Date</option>
                </select>
                <select value={this.state.orderDirection} onChange={this.handleOrderDirectionChange} >
                    <option value="asc">Sort Ascending</option>
                    <option value="desc">Sort Descending</option>
                </select>
                <hr className="commentsHR"></hr>
                <form onSubmit={this.handleComment}>
                    <img src={user.avatar_url} alt="Avatar for logged in user" height="50px"></img>
                    <input type="text" placeholder="leave a comment .." value={this.state.commentBody} onChange={this.handleInput}></input>
                    <button type="submit"> Submit >> </button>
                </form>
                <hr className="commentsHR"></hr>
            </main>
        );
    }

    handleComment = (event) => {
        event.preventDefault();
        api.submitComment(this.props.article, this.props.user.user_id, this.state.commentBody).then((comment) => {
            this.props.commentAdded(comment)
        })
    }

    handleInput = (event) => {
        this.setState({
            commentBody: event.target.value
        })
    }

    handleOrderChange = (event) => {
        this.props.commentOrderingChanged(event.target.value);
        this.setState({
            orderingValue: event.target.value
        });
    }

    handleOrderDirectionChange = (event) => {
        this.props.commentDirectionChanged(event.target.value);
        this.setState({
            orderDirection: event.target.value
        })
    }

}

export default CommentForm;