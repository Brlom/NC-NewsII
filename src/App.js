import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import * as api from './api';
import Auth from './Components/Base-comp/Auth';
import Nav from './Components/Base-comp/Nav';
import NewArticle from './Components/Interactive/NewArticle';
import Home from './Components/Home';
import Topics from './Components/Topics';
import Article from './Components/Article';
import Users from './Components/Users';
import User from './Components/User';
import ArticleResults from './Components/Article-search/ArticleResults';
import FilteredArticles from './Utils/filteredArticles';
import Footer from './Components/Base-comp/Footer';

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
            <Home path="/home" setLoginSeen={this.setLoginSeen} loginSeen={loginSeen} user={user} />
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
      filteredArticles: FilteredArticles(event.target.value, 20)
    });
  }

  handleLogout = (event) => {
    this.setState({
      user: ''
    })
  }
}

export default App;
