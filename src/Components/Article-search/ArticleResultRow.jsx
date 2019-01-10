import React from 'react';
import moment from 'moment';
import { Link } from '@reach/router';

const ArticleResultRow = ({ article }) => {
    return (
        <div>
            <ul>
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                {" | "}
                <Link to={`/users/${article.author}`}>{article.name}</Link>
                {" | "}
                <li>{moment(article.created_at).fromNow()}</li>
                {" | "}
                <li>Comments: {article.comment_count}</li>
                <hr />
            </ul>
        </div >
    );
};

export default ArticleResultRow; 