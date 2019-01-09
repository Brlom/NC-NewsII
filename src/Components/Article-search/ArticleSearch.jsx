import React, { Component } from 'react';

class ArticleSearch extends Component {
    render() {
        return (
            <div className="search-input">
                <div>
                    <input onChange={this.handleChange} />
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        this.props.textChange(event)
    }

}

export default ArticleSearch;