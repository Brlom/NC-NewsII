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
import ArticleSearch from './Components/Article-search/ArticleSearch';
import ArticleResults from './Components/Article-search/ArticleResults';
import FilteredArticles from './Components/Article-search/FilteredArticles';
import Footer from './Components/Base-comp/Footer';

class App extends Component {
  state = {
    user: "",
    loginSeen: false,
    articles: [],
    searchText: '',
    maxResults: 5,
  }

  render() {
    const { articles, user, loginSeen, searchText, maxResults } = this.state;
    return (
      <div className="App">
        <Auth setUser={this.setUser} user={user}>
          <Nav user={user} handleLogout={this.handleLogout} />
          <ArticleResults articles={articles} searchText={searchText} maxResults={maxResults} />
          <Router>
            <NewArticle path="/topics/articles/new" user={user} />
            <Home path="/home" setLoginSeen={this.setLoginSeen} loginSeen={loginSeen} user={user} />
            <Topics path="/topics" />
            <Article user={user} path="/articles/:article_id" />
            <Users path="/users" />
            <User path="/users/:username" />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  setUser = (user) => {
    this.setState({ user })
    localStorage.setItem("user", JSON.stringify(user));
  }

  setLoginSeen = () => {
    if (!this.state.user) {
      return
    }
    this.setState({ loginSeen: true })
  }

  componentDidMount() {
    const storageUser = localStorage.getItem("user");
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
