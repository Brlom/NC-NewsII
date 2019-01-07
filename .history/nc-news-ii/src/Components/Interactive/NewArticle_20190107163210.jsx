import React, { Component } from 'react';
import { navigate } from '@reach/router';

class NewArticle extends Component {
    state = {
        topicValue: "",
        titleValue: "",
        articleBody: ""
    }

    render() {
        return (
            <div id="article-form-submit">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Topic:
                        <input name="topicValue" type="text" value={this.state.topicValue} onChange={this.handleChange} />
                    </label>
                    <label>
                        Article Title:
                        <input name="titleValue" type="text" value={this.state.titleValue} onChange={this.handleChange} />
                    </label>
                    <label>
                        Article Text:
                    <textarea name="articleBody" value={this.state.articleBody} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        api.submitArticle(this.state.topicValue, this.state.articleBody, this.state.titleValue, this.props.user.user_id).then(article => {
            if (!article) {
                navigate('/articles')
            } else
                navigate(`/articles/${article.article_id}`)
        })
    }
}

export default NewArticle;