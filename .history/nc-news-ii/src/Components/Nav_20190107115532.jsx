import React, { Component } from 'react';
import './Nav.css';
import Icon from '../Images/icon.png';
import { Link } from '@reach/router';
import NavSearch from './interactive/NavSearch';
import NavUser from './interactive/NavUser';

class Nav extends Component {
    render() {
        return (
            <nav>
                <ul className="nav">
                    <li><img
                        className="navLogo"
                        src={Icon}
                        alt="NorthCoders News Logo"
                    >
                    </img></li>
                    <li><Link to="/home">Home</Link></li>
                    {" "}
                    <li><Link to="/topics">Topics</Link></li>
                    {" "}
                    <li><Link to="/users">Users</Link></li>
                    {" "}
                    <li><NavSearch /></li>
                    {" "}
                    <li><NavUser user={this.props.user} handleLogout={this.props.handleLogout} /></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;