import React, { Component } from 'react';
import './App.css';
import Auth from './Components/base_comp/Auth';
import Nav from './Components/Nav';
import { Router } from '@reach/router';
import Home from './Components/Home';
import Topics from './Components/Topics';
import Users from './Components/Users';
import Footer from './Components/base_comp/Footer';

class App extends Component {
  state = {
    user: "",
    loginSeen: false,
  }

  render() {
    const { user, loginSeen } = this.state;
    return (
      <div className="App">
        <Auth setUser={this.setUser} user={user}>
          <Nav user={user} handleLogout={this.handleLogout} />
          <Router>
            <Home setLoginSeen={this.setLoginSeen} loginSeen={loginSeen} user={user} path="/home" />
            <Topics path="/topics" />
            <Users path="/users" />
          </Router>
          <Footer />
        </Auth>
      </div>
    );
  }

  setUser = (user) => {
    this.setState({ user })
  }

  setLoginSeen = () => {
    if (!this.state.user) {
      return
    }
    this.setState({ loginSeen: true })
  }

  // componentDidMount() {
  //   this.setState({
  //     user: JSON.parse(localStorage.getItem("user"))
  //   });
  // }

  // componentDidUpdate() {
  //   localStorage.setItem("user", JSON.stringify(this.state.user));
  // }

  handleLogout = (event) => {
    this.setState({
      user: ''
    })
  }
}

export default App;

