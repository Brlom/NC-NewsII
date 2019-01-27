import React, { Component } from 'react';
import './Nav.css';
import Icon from '../../images/icon.png';
import Search from '../interactive/Search';
import NavUser from '../interactive/NavUser';
import MediaQuery from 'react-responsive';
import { slide as Menu } from 'react-burger-menu'

class Nav extends Component {
    state = {
        showMobileMenu: false,
    }
    render() {
        return (
            <div className="topNav" id="myTopNav">
                <img
                    className="navLogo"
                    src={Icon}
                    alt="NorthCoders News Logo"
                >
                </img>
                <MediaQuery query="(min-device-width: 600px)">
                    <a href="/" className="active">Home</a>
                    {" "}
                    <a href="/topics" className="active">Topics</a>
                    {" "}
                    <a href="/users" className="active">Users</a>
                    {" "}
                    <div className="dropdown1">
                        <Search setArticleSearchResults={this.props.setArticleSearchResults} onSearch={this.onSearch} />
                    </div>
                    {" "}
                    <div className="dropdown"><NavUser user={this.props.user} handleLogout={this.props.handleLogout} /></div>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 599px)">
                    <Menu left noOverlay isOpen={this.state.showMobileMenu}>
                        <ul>
                            <li><a id="home" href="/" className="menu-item bm-item">Home</a></li>
                            <li><a id="topics" href="/topics" className="menu-item bm-item">Topics</a></li>
                            <li><a id="users" href="/users" className="menu-item bm-item">Users</a></li>
                            <li><div className="dropdown"><NavUser user={this.props.user} handleLogout={this.props.handleLogout} /></div></li>
                            <li><div className="dropdown1"><Search setArticleSearchResults={this.props.setArticleSearchResults} onSearch={this.onSearch} /></div></li>
                        </ul>




                    </Menu>
                </MediaQuery>

                <hr className="navHR" />
            </div>
        );
    }

    onSearch = () => {
        this.setState({ showMobileMenu: false })
    }
}

export default Nav;
