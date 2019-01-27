import React, { Component } from 'react';
import moment from 'moment';
import * as api from '../../api';
import { Link } from '@reach/router';
import Icon from '../../images/icon.png';

class ArticleSummary extends Component {
    state = {
        article: this.props.article,
        currentVotes: 0,
    }

    render() {
        const { currentVotes, article } = this.state;
        return (
            <div className="topicArticleElements" key={article.article_id}>
                <img src={Icon} alt="NorthCoders News Logo" height="15px"></img>
                <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id)} disabled={currentVotes === 1}>⬆</button>
                <span className="voteCount">{article.votes}</span>
                <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id)} disabled={currentVotes === -1}>⬇</button>
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                {" | "}
                <span className="numComments">Comments: {article.comment_count}</span>
                {" | "}
                <Link to={`/users/${article.author}`}>{article.name}</Link>
                {" | "}
                {moment(article.created_at).fromNow()}
                <hr></hr>
            </div>
        );
    }

    handleUpVote = (article_id) => {
        api.voteArticle(article_id, 1)
        const newArticle = this.state.article;
        newArticle.votes += 1;
        this.setState({ article: newArticle, currentVotes: this.state.currentVotes + 1 })
    }

    handleDownVote = (article_id) => {
        api.voteArticle(article_id, -1)
        const newArticle = this.state.article;
        newArticle.votes += -1;
        this.setState({ article: newArticle, currentVotes: this.state.currentVotes - 1 })
    }
}

export default ArticleSummary;