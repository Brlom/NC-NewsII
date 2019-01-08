import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import moment from 'moment';

class Article extends Component {
    state = {
        article: {},
        comments: [],
    }
    render() {
        const { article } = this.state;
        return (
            <div className="articleRender">
                <h1>{article.title}</h1>
                <button className="voteButton upVote">⬆</button>
                <span className="voteCount">0{article.votes}</span>
                <button className="voteButton downVote">⬇</button>
                <Link to={`/users/${article.author}`}>{article.author}</Link>
                {" | "}
                {moment(article.created_at).fromNow()}
                <p>{article.body}</p>
                <hr></hr>
                <div className="articleBottomContainer"></div>
                <button className="loadCommentsForArticle">Load Comments</button>
            </div>
        );
    }

    componentDidMount() {
        const { article_id } = this.props;
        api.getArticleById(article_id).then(article => {
            this.setState({
                article
            });
        });
        api.getCommentsByArticleId(article_id).then(comments => {
            this.setState({
                comments
            });
        });
    }

}

export default Article;