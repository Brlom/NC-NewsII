import React, { Component } from 'react';
import ArticleSummary from '../baseComp/ArticleSummary';

class ArticleResults extends Component {
    render() {
        const { articles, searchQuery } = this.props;
        return (
            <div className="component-search-results">
                <h4 className="contentHeader">{`Search Results for: ${searchQuery}`}</h4>
                {articles.map(article => {
                    return <ArticleSummary key={article.article_id} article={article} />
                })}
                <div className="bottomContainer"></div>
            </div>

        );
    }


}

export default ArticleResults;