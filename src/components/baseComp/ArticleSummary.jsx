import React, { Component } from 'react';
import moment from 'moment';
import { Link } from '@reach/router';
import Votes from '../baseComp/Votes';

class ArticleSummary extends Component {
    state = {
        article: this.props.article
    }
    render() {
        const { article } = this.state;
        return (
            <div className="topicArticleElements" key={article.article_id}>
                <Votes article={article} elementUpdated={this.articleUpdated} />
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

    articleUpdated = article => {
        this.setState({ article: article });
    }
}

export default ArticleSummary;