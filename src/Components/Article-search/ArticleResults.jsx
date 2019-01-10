import React, { Component } from 'react';
import ArticleResultsRow from './ArticleResultRow';

class ArticleResults extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="component-search-results">
                <h4>{`Search Results for: ${this.props.articles.author}`}</h4>
                {this.props.articles.map(article => {
                    return <ArticleResultsRow key={article.title} article={article} />
                })}
            </div>
        );
    }
}

export default ArticleResults;