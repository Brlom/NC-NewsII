import React from 'react';

const FilteredArticles = ({ searchText, maxResults, articles }) => {
    return articles
        .filter((article) => {
            if (article.title.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            if (article.body.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            return false;
        })
        .slice(0, maxResults);
};

export default FilteredArticles;