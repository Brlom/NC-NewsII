import React, { Component } from 'react';
import * as api from '../../api';
import { navigate } from '@reach/router';

class NewArticle extends Component {
    state = {
        topicValue: '',
        articleBody: '',
        titleValue: '',
    }

    render() {
        return (
            <main>
                <h1>Publish a new article: </h1>
                <form className="newArticleForm" onSubmit={this.handleSubmit}>
                    <label>Select topic: </label>
                    <select className="topicSelectorNewArticle" name="topicValue" value={this.state.topicValue} onChange={this.handleChange}>
                        <option value="topics">Topics</option>
                        <option value="coding">Coding</option>
                        <option value="football">Football</option>
                        <option value="cooking">Cooking</option>
                    </select>
                    <fieldset>
                        <legend >New Article</legend>
                        Title:
                <input className="newArticleInput" name="titleValue" placeholder="Article Title .." type="text" value={this.state.titleValue} onChange={this.handleChange}></input> <br />
                        Article:
                <textarea className="newArticleInput" name="articleBody" placeholder=" Article Text .." value={this.state.articleBody} onChange={this.handleChange} ></textarea> <br />
                    </fieldset>
                    <button className="submitButtonNewArticle" type="submit" value="submit" >Publish</button>
                </form >
                <hr className="textBreakNewArticle"></hr>
            </main >
        );
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { topicValue, articleBody, titleValue } = this.state;
        const { user: { user_id } } = this.props;
        api.submitArticle(topicValue, articleBody, titleValue, user_id).then(article => {
            if (!article) {
                navigate('/home')
            } else {
                navigate(`/articles/${article.article_id}`)
            }
        })
    }

}

export default NewArticle;