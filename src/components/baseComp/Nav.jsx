import React, { Component } from 'react';
import './Nav.css';
import Icon from '../../images/icon.png';
import Search from '../interactive/Search';
import NavUser from '../interactive/NavUser';

class Nav extends Component {
    render() {
        return (
            <div className="topNav" id="myTopNav">
                <img
                    className="navLogo"
                    src={Icon}
                    alt="NorthCoders News Logo"
                >
                </img>
                <a href="/" className="active">Home</a>
                {" "}
                <a href="/topics" className="active">Topics</a>
                {" "}
                <a href="/users" className="active">Users</a>
                {" "}
                <div className="dropdown1">
                    <Search setArticleSearchResults={this.props.setArticleSearchResults} />
                </div>
                {" "}
                <div className="dropdown"><NavUser user={this.props.user} handleLogout={this.props.handleLogout} /></div>
                <hr className="navHR" />
            </div>
        );
    }
}

export default Nav;
