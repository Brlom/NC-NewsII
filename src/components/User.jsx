import React, { Component } from 'react';
import * as api from '../api';

class User extends Component {
    state = {
        user: {},
        articles: [],
    }

    render() {
        const { user, articles } = this.state;
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
                user
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