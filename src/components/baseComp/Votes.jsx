import React, { Component } from 'react';
import * as api from '../../api';

class Votes extends Component {
    state = {
        currentVotes: 0,
    }
    render() {
        const { article, comment } = this.props;
        const { currentVotes } = this.state;
        return (
            <div className="alignVotes">
                <button className="voteButton upVote" onClick={() => this.handleVote(1)} disabled={currentVotes === 1} >⬆</button>
                <span className="voteCount">{comment ? comment.votes : article.votes}</span>
                <button className="voteButton downVote" onClick={() => this.handleVote(-1)} disabled={currentVotes === -1} >⬇</button>
            </div>
        );
    }

    handleVote = (vote) => {
        if (this.props.comment) {
            api.voteComment(this.props.article.article_id, this.props.comment.comment_id, vote)
        } else {
            api.voteArticle(this.props.article.article_id, vote);
        }
        const newElement = this.props.comment ? this.props.comment : this.props.article;
        newElement.votes += vote;
        this.props.elementUpdated(newElement);
        this.setState({ currentVotes: this.state.currentVotes + vote });
    }
}

export default Votes;