import React, { Component } from 'react';
import ArticleResultsRow from './ArticleResultRow';

class ArticleResults extends Component {
    render() {
        return (
            <div className="component-search-results">
                {this.props.articles.map(articles => {
                    return <ArticleResultsRow key={articles.title} title={articles.title} body={articles.body} />
                })}
            </div>
        );
    }
}

export default ArticleResults;