import React, { Component } from 'react';
import * as api from '../api';
import ajaxLoader from '../utils/ajax-loader.gif';

class User extends Component {
    state = {
        user: {},
        articles: [],
        isLoading: true,
    }

    render() {
        const { user, articles, isLoading } = this.state;
        if (isLoading) {
            return (
                <React.Fragment key="user">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        return (
            <div>
                <div>
                    <img src={user.avatar_url} alt="Selected Article Author Avatar" height="200px"></img>
                </div>
                <h2>Username: {user.username}</h2>
                <h2>Name: {user.name}</h2>
                <h2>Articles: {articles.length}</h2>
            </div>
        );
    }

    componentDidMount() {
        this.fetchUser();
        this.fetchArticlesByAuthor();
    }

    fetchUser() {
        const { username } = this.props;
        api.getUserByUsername(username).then(user => {
            this.setState({
                user, isLoading: false
            });
        });
    }

    fetchArticlesByAuthor = () => {
        const { username } = this.props;
        api.getArticlesByAuthor(username).then((articles) => {
            this.setState({
                articles
            })
        })

    }

}

export default User;