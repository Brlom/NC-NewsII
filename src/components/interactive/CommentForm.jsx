import React, { Component } from 'react';
import * as api from '../../api';
import { notify } from 'react-notify-toast';

class CommentForm extends Component {
    state = {
        orderingValue: this.props.commentSortBy,
        orderDirection: this.props.commentOrderDirection,
        commentBody: "",
    }
    render() {
        const { user } = this.props;
        return (
            <main>
                <label className="commentsSort">Sort by</label>
                <select value={this.state.orderingValue} className="commentValueSelect" onChange={this.handleOrderChange}>
                    <option value="author">Author</option>
                    <option value="votes">Votes</option>
                    <option value="created_at">Date</option>
                </select>
                <select value={this.state.orderDirection} className="commentValueSort" onChange={this.handleOrderDirectionChange} >
                    <option value="asc">Sort Ascending</option>
                    <option value="desc">Sort Descending</option>
                </select>
                <form onSubmit={this.handleComment} className="commentInputForm">
                    <img src={user.avatar_url} alt="Avatar for logged in user" height="30px"></img>
                    <textarea type="text" className="commentTextarea" placeholder="leave a comment .." value={this.state.commentBody} onChange={this.handleInput} ></textarea>
                    <br />
                    <button type="submit" className="commentSubmitButton"> Submit >> </button>
                </form>
                <hr className="commentsHR"></hr>
            </main>
        );
    }

    handleComment = (event) => {
        event.preventDefault();
        if (!this.state.commentBody) {
            notify.show('New comment must have a body!', 'error');
            return;
        }
        api.submitComment(this.props.article, this.props.user.user_id, this.state.commentBody).then((comment) => {
            comment.author = this.props.user.username;
            comment.avatar_url = this.props.user.avatar_url;
            this.props.commentAdded(comment);
            this.setState({ commentBody: "" });
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