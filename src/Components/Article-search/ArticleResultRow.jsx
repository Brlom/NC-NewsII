import React from 'react';

const ArticleResultRow = ({ title, body }) => {
    return (
        <div>
            <p>{title}</p>
            <p>{body}</p>
        </div>
    );
};

export default ArticleResultRow; 