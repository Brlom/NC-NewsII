import React, { Component } from 'react';
import ArticleResultsRow from './ArticleResultRow';

class ArticleResults extends Component {
    render() {
        const { articles } = this.props;
        return (
            <div className="component-search-results">
                <h4>{`Search Results for: search`}</h4>
                {articles.map(article => {
                    return <ArticleResultsRow key={article.title} article={article} />
                })}
            </div>
        );
    }

}

export default ArticleResults;