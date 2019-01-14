import React, { Component } from 'react';
import './Nav.css';
import Icon from '../../images/icon.png';
import { Link } from '@reach/router';
import Search from '../interactive/Search';
import NavUser from '../interactive/NavUser';

class Nav extends Component {
    render() {
        return (
            <nav >
                <ul className="nav">
                    <li><img
                        className="navLogo"
                        src={Icon}
                        alt="NorthCoders News Logo"
                    >
                    </img></li>
                    <li className="navOne"><Link to="/home">Home</Link></li>
                    {" "}
                    <li className="navTwo"><Link to="/topics">Topics</Link></li>
                    {" "}
                    <li className="navThree"><Link to="/users">Users</Link></li>
                    {" "}
                    <li className="navFour"><Search setArticleSearchResults={this.props.setArticleSearchResults} /></li>
                    {" "}
                    <li className="navFive"><NavUser user={this.props.user} handleLogout={this.props.handleLogout} /></li>
                    <hr className="navHR" />
                </ul>
            </nav>
        );
    }
}

export default Nav;
