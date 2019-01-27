import React, { Component } from 'react';
import * as api from '../../api';
import { navigate } from '@reach/router';
import { notify } from 'react-notify-toast';

class NewArticle extends Component {
    state = {
        topicValue: '',
        articleBody: '',
        titleValue: '',
    }

    render() {
        return (
            <main>
                <h1 className="contentHeader">Publish a new article </h1>
                <form className="newArticleForm" onSubmit={this.handleSubmit}>


                    <fieldset className="articleFieldset">
                        <label for="topicSelector">Select topic: </label>
                        <select id="topicSelector" className="topicSelectorNewArticle" name="topicValue" value={this.state.topicValue} onChange={this.handleChange}>
                            <option value="">---</option>
                            <option value="coding">Coding</option>
                            <option value="football">Football</option>
                            <option value="cooking">Cooking</option>
                        </select>
                        <label for="titleInput">Title:</label>
                        <input id="titleInput" className="newArticleInput" name="titleValue" placeholder="Article Title .." type="text" maxLength="40" value={this.state.titleValue} onChange={this.handleChange}></input> <br />

                        <label for="bodyInput">Article:</label>
                        <textarea id="bodyInput" className="newArticleTextarea" name="articleBody" placeholder=" Article Text .." value={this.state.articleBody} onChange={this.handleChange} ></textarea> <br />

                    </fieldset>
                    <button className="submitButtonNewArticle" type="submit" value="submit" >Publish</button>
                </form >
                <div className="bottomContainer"></div>
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
        if (!titleValue) {
            notify.show('New Article must have a title!', 'error');
            return
        } else if (!articleBody) {
            notify.show('New Article must have a body!', 'error');
            return
        } else if (!topicValue) {
            notify.show('New Article must have a topic!', 'error');
            return
        }
        api.submitArticle(topicValue, articleBody, titleValue, user_id).then(article => {
            if (!article) {
                navigate('/')
            } else {
                navigate(`/articles/${article.article_id}`)
            }
        })
    }

}

export default NewArticle;