import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';

class Home extends Component {
    state = {
        articles: [],
        hideWelcomeScreen: false,
    }
    render() {
        const { articles } = this.state;
        const { loginSeen } = this.props;
        if (loginSeen) {
            return (
                <div className="userArticleContainer">
                    <h2>My Articles</h2>
                    {articles.map(article => {
                        return (
                            <ul key={article.article_id}>
                                <li>
                                    <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                                    {" | "}
                                    <span>{moment(article.created_at).fromNow()}</span>
                                    {" | "}
                                    <span>{article.topic}</span>
                                    {" | "}
                                    <button className="deleteButton" onClick={() => this.handleDelete(article.article_id)}>Delete</button>
                                </li>
                                <p>{article.body}</p>
                                <hr className="textBreak"></hr>
                            </ul>
                        );
                    })}
                    <div className="userArticleBottomContainer"></div>
                </div>
            )
        } else {
            return (
                <div className={"welcomeScreen " + (this.props.loginSeen ? "disabled" : "enabled")}>
                    <h1>Welcome Back {this.props.user.name}</h1>
                </div>
            );
        }
    }

    hideWelcomeScreen = () => {
        this.props.setLoginSeen()
        // this timeout should be the same as the transition speed in the css. 
        setTimeout(() => {
            this.setState({ hideWelcomeScreen: true })
        }, 500)
    }

    handleDelete = (article_id) => {
        api.deleteArticle(article_id).then(() => {
            this.fetchArticlesByAuthor();
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.hideWelcomeScreen()
        }, 2000)
        this.fetchArticlesByAuthor();
    }

    fetchArticlesByAuthor = () => {
        api.getArticlesByAuthor(this.props.user.username).then(articles => {
            this.setState({
                articles: articles
            })
        })
    }

}

export default Home;