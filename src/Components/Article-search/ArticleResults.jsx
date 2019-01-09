import React, { Component } from 'react';
import filterArticles from '../../Utils/filteredArticles';
import ArticleResultsRow from './ArticleResultRow';

class ArticleResults extends Component {
    render() {
        const { searchText, maxResults, articles } = this.props;
        const displayArticles = filterArticles({ searchText, maxResults, articles })
        return (
            <div className="component-search-results">
                {displayArticles.map(articles => {
                    return <ArticleResultsRow key={articles.title} title={articles.title} />
                })}
            </div>
        );
    }
}

export default ArticleResults;