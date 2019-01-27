import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import Notifications from 'react-notify-toast';
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
import Handle404s from './components/baseComp/Handle404s';

class App extends Component {
  state = {
    user: "",
    articles: [],
    searchArticleResults: [],
    searchQuery: "",
  }

  render() {
    const { user, searchArticleResults, articles, searchQuery } = this.state;
    return (
      <div className="App">
        <Notifications />
        <Auth setUser={this.setUser} user={user}>
          <Nav user={user} handleLogout={this.handleLogout} setArticleSearchResults={this.setArticleSearchResults} /* setArticleQuery={this.setArticleQuery} */ />
          <Router className="content">
            <NewArticle path="/topics/articles/new" user={user} />
            <Home path="/" user={user} />
            <Topics path="/topics" />
            <Article path="/articles/:article_id" user={user} />
            <Users path="/users" articles={articles} />
            <User path="/users/:username" />
            <ArticleResults path="/result" articles={searchArticleResults} searchQuery={searchQuery} />
            <Handle404s default />
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

  setArticleSearchResults = (articles, searchQuery) => {
    this.setState({
      searchArticleResults: articles, searchQuery: searchQuery
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
    sessionStorage.setItem("loginSeen", JSON.stringify(false));
    sessionStorage.removeItem("user");
    navigate("/");
  }
}

export default App;
