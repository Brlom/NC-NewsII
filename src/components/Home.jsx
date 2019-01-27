import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import { Link } from '@reach/router';
import ajaxLoader from '../utils/ajax-loader.gif';

class Home extends Component {
    state = {
        articles: [],
        loginSeen: false,
        hideWelcomeScreen: false,
        isLoading: true,
    }
    render() {
        const { articles, loginSeen, isLoading } = this.state;
        if (isLoading && loginSeen) {
            return (
                <React.Fragment key="home">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        if (loginSeen) {
            return (
                <div className="userArticleContainer">
                    <h2 className="contentHeader">My Articles</h2>
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
                    <div className="bottomContainer"></div>
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

    hideWelcomeScreen = (waitTime) => {
        // this timeout should be the same as the transition speed in the css. 
        setTimeout(() => {
            this.setState({ hideWelcomeScreen: true, loginSeen: true });
            sessionStorage.setItem("loginSeen", JSON.stringify(true));
        }, waitTime)
    }

    handleDelete = (article_id) => {
        api.deleteArticle(article_id).then(() => {
            this.fetchArticlesByAuthor();
        });
    }

    componentDidMount() {
        const isLoginSeen = sessionStorage.getItem("loginSeen");
        if (isLoginSeen !== "true") {
            setTimeout(() => {
                this.hideWelcomeScreen(500)
            }, 2000)
        } else {
            this.hideWelcomeScreen(0)
        }
        this.fetchArticlesByAuthor();
    }

    fetchArticlesByAuthor = () => {
        api.getArticlesByAuthor(this.props.user.username).then(articles => {
            this.setState({
                articles: articles, isLoading: false
            })
        })
    }

}

export default Home;