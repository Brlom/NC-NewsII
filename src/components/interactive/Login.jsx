import React, { Component } from 'react';
import * as api from '../../api';
import ajaxLoader from '../../utils/ajax-loader.gif';

class Login extends Component {
    state = {
        users: [],
        selectedUser: "",
        selectedUserIndex: null,
        failed: false,
        isLoading: true,
    }
    render() {
        const { users, selectedUser, isLoading } = this.state;
        if (isLoading) {
            return (
                <React.Fragment key="login">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        return (
            <div className="content">

                <div className="topContainer loginContainer">
                    <h2 className="contentHeader">Log in:</h2>
                    <ul className="userSelect">{users.map((user) => {
                        return (
                            <li key={user.user_id} className="userSelectImg" onClick={this.onUserSelect} value={user.username}>
                                <img src={user.avatar_url} alt="user avatar" className={"userAvatar " + (selectedUser === user.username ? "selectedUser" : "")} height="100"></img>
                            </li>
                        );
                    })}
                    </ul>
                    <button className="loginSubmit" onClick={this.handleLogin} type="submit" disabled={selectedUser === ""}>Log In >></button>
                    <div className="bottomContainer">
                    </div>
                </div>
            </div >
        );
    }
    componentDidMount() {
        api.getUsers().then(users => {
            this.setState({ users, isLoading: false });
        });
    }

    onUserSelect = (event) => {
        this.setState({ selectedUser: event.currentTarget.getAttribute("value") })
    }

    handleLogin = (event) => {
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