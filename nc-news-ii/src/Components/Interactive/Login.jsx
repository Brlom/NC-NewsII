import React, { Component } from 'react';
import * as api from '../../api';
import Header from '../Base-comp/Header';

class Login extends Component {
    state = {
        users: [],
        selectedUser: "",
        selectedUserIndex: null,
        failed: false
    }
    render() {
        const { users } = this.state;
        return (
            <div className="content">
                <Header />
                <div className="topContainer">
                    <h2>Log in:</h2>
                    <ul className="userSelect">{users.map((user) => {
                        return (
                            <li key={user.user_id} className="userSelectImg" onClick={this.onUserSelect} value={user.username}>
                                <img src={user.avatar_url} alt="user avatar" className={"userAvatar " + (this.state.selectedUser === user.username ? "selectedUser" : "")} height="100"></img>
                            </li>
                        );
                    })}
                    </ul>
                    <button className="loginSubmit" onClick={this.handleLogin} type="submit">Log In >></button>
                    <div className="bottomContainer">
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        api.getUsers().then(users => {
            this.setState({ users });
        });
    }
    onUserSelect = (event) => {
        event.preventDefault();
        this.setState({ selectedUser: event.currentTarget.getAttribute("value") })
    }
    handleLogin = (event) => {
        event.preventDefault();
        api.getUserByUsername(this.state.selectedUser).then(user => {
            if (user) {
                this.props.setUser(user)
            } else {
                this.setState({ failed: true })
            }
        })
    }
}

export default Login;