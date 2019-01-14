import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import * as api from './api';
import Auth from './components/baseComp/Auth';
import Nav from './components/baseComp/Nav';
import NewArticle from './components/interactive/NewArticle';
import Home from './components/Home';
import Topics from './components/Topics';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import ArticleResults from './components/articleSearchComp/ArticleResults';
import filteredArticles from './utils/filteredArticles';
import Footer from './components/baseComp/Footer';

class App extends Component {
  state = {
    user: "",
    loginSeen: false,
    articles: [],
    searchArticleResults: [],
    // query: "",
  }

  render() {
    const { user, loginSeen, searchArticleResults, articles /* query */ } = this.state;
    return (
      <div className="App">
        <Auth setUser={this.setUser} user={user}>
          <Nav user={user} handleLogout={this.handleLogout} setArticleSearchResults={this.setArticleSearchResults} /* setArticleQuery={this.setArticleQuery} */ />
          <Router>
            <NewArticle path="/topics/articles/new" user={user} />
            <Home path="/" setLoginSeen={this.setLoginSeen} loginSeen={loginSeen} user={user} />
            <Topics path="/topics" />
            <Article path="/articles/:article_id" user={user} />
            <Users path="/users" articles={articles} />
            <User path="/users/:username" />
            <ArticleResults path="/result" articles={searchArticleResults} /* query={query} */ />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  setUser = (user) => {
    this.setState({ user })
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  setLoginSeen = () => {
    if (!this.state.user) {
      return
    }
    this.setState({ loginSeen: true })
  }

  setArticleSearchResults = (articles) => {
    this.setState({
      searchArticleResults: articles
    })
  }

  // setArticleQuery = (query) => {
  //   this.setState({
  //     query: query
  //   })
  // }

  componentDidMount() {
    const storageUser = sessionStorage.getItem("user");
    this.fetchAllArticles();
    if (storageUser) {
      this.setState({
        user: JSON.parse(storageUser)
      });
    }
  }

  fetchAllArticles() {
    api.getArticles().then((articles) => {
      this.setState({
        articles
      })
    })
  }

  handleInputChange = (event) => {
    this.setState({
      filteredArticles: filteredArticles(event.target.value, 20)
    });
  }

  handleLogout = (event) => {
    this.setState({
      user: ''
    })
  }
}

export default App;
