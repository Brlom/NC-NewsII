import React, { Component } from 'react';
import ArticleResultsRow from './ArticleResultRow';

class ArticleResults extends Component {
    render() {
        const { articles, searchQuery } = this.props;
        return (
            <div className="component-search-results">
                <h4>{`Search Results for: ${searchQuery}`}</h4>
                {articles.map(article => {
                    return <ArticleResultsRow key={article.title} article={article} />
                })}
            </div>
        );
    }

}

export default ArticleResults;