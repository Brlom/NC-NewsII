import React, { Component } from 'react';
import * as api from '../../api';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

class NewArticle extends Component {
    state = {
        topicValue: '',
        articleBody: '',
        titleValue: '',
    }

    render() {
        return (
            <main>
                <h1>Create a new article: </h1>
                <button type="radio">Choose Topic <FontAwesomeIcon icon={faAngleDown} /></button>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Article</legend>
                        Title:
                <input placeholder="Article Title .." type="text" value={this.state.titleValue} onChange={this.handleChange}></input> <br />
                        Article:
                <textarea placeholder="Article Text .." value={this.state.articleBody} onChange={this.handleChange} ></textarea> <br />
                    </fieldset>
                </form >
                <button type="submit" value="submit" >Publish</button>
                <hr></hr>
            </main >
        );
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.user.user_id)
        api.submitArticle(this.state.topicValue, this.state.articleBody, this.state.titleValue, this.props.user.user_id).then(article => {
            if (!article) {
                navigate('/home')
            } else
                navigate(`/articles/${article.article_id}`)
        })
    }

}

export default NewArticle;