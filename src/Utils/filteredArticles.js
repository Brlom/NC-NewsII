const filteredArticles = ({ searchText, maxResults, articles }) => {
    console.log(articles)
    console.log(searchText)
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

export default filteredArticles;