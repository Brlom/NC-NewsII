import React, { Component } from 'react';

class CommentForm extends Component {
    render() {
        const { user, comments, commentAdded } = this.props;
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
                <button type="submit" onClick={() => commentAdded()}> Submit >> </button>
                <hr className="commentsHR"></hr>
            </main>
        );
    }
}

export default CommentForm;