import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import ajaxLoader from '../utils/ajax-loader.gif';

class Users extends Component {
    state = {
        users: [],
        isLoading: true,
    }
    render() {
        const { users, isLoading } = this.state;
        if (isLoading) {
            return (
                <React.Fragment key="users">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <h2 className="contentHeader">Users</h2>
                <ul className="usersList">{users.map(user => {
                    return (
                        <div key={user.user_id}>
                            <li>
                                <img src={user.avatar_url} alt="user avatar" height="50" width="50"></img>
                                <Link to={`/users/${user.username}`}>{user.username}</Link>
                                {" | "}
                                {user.name}
                            </li>
                            <hr className="textBreak"></hr>
                        </div>
                    );
                })}
                </ul>
                <div className="bottomContainer"></div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        api.getUsers().then(users => {
            this.setState({ users, isLoading: false });
        });
    }
}

export default Users;