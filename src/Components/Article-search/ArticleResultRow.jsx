import React, { Component } from 'react';
import * as api from '../../api';
import moment from 'moment';
import { Link } from '@reach/router';

class ArticleResultRow extends Component {
    state = {
        article: this.props.article,
        currentVotes: 0,
    }
    render() {
        const { currentVotes, article } = this.state;
        return (
            <div>
                <ul>
                    <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id)} disabled={currentVotes === 1} >⬆</button>
                    <span className="voteCount">{article.votes}</span>
                    <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id)} disabled={currentVotes === -1} >⬇</button>
                    <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                    {" | "}
                    <Link to={`/users/${article.author}`}>{article.name}</Link>
                    {" | "}
                    <li>{moment(article.created_at).fromNow()}</li>
                    {" | "}
                    <li>Comments: {article.comment_count}</li>
                    <hr />
                </ul>
            </div >
        );
    }

    handleUpVote = (article_id) => {
        api.voteArticle(article_id, 1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += 1;
            this.setState({ article: newArticle, currentVotes: this.state.currentVotes + 1 })
        })
    }

    handleDownVote = (article_id) => {
        api.voteArticle(article_id, -1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += -1;
            this.setState({ article: newArticle, currentVotes: this.state.currentVotes - 1 })
        })
    }
}

export default ArticleResultRow;