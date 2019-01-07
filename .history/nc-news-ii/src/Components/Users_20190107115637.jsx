import React, { Component } from 'react';
import * as api from '../api';

class Users extends Component {
    state = {
        users: [],
    }
    render() {
        const { users } = this.state;
        return (
            <React.Fragment>
                <h2>Users</h2>
                <ul className="user-scroll">{users.map(user => {
                    return (
                        <div key={user.user_id}>
                            <li>
                                <img src={user.avatar_url} alt="user avatar" height="50" width="50"></img>
                                {user.username}
                                <br />
                                {user.name}
                            </li>
                            <hr className="textBreak"></hr>
                        </div>
                    );
                })}
                </ul>
                <div className="userBottomContainer"></div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        api.getUsers().then(users => {
            this.setState({ users });
        });
    }
}

export default Users;