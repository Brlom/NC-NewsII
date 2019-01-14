import React, { Component } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

class NavUser extends Component {
    state = {
        showMenu: false,
    }
    render() {
        return (
            <React.Fragment>
                <button className="userNavButton" onClick={this.showMenu}>{this.props.user.name}<FontAwesomeIcon icon={faAngleDown} /></button>
                {
                    this.state.showMenu
                        ? (
                            <div
                                className="searchInput" ref={(element) => { this.dropdownMenu = element; }}
                            >
                                <ul>
                                    <li><img src={this.props.user.avatar_url} alt="user avatar" width="20"></img>{this.props.user.username}</li>
                                    <Link to="/topics/articles/new" className="newTopicArticle">New Article</Link>
                                    <li><button className="logoutSubmit" onClick={this.props.handleLogout} type="submit">Log out</button></li>
                                </ul>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </React.Fragment>
        );
    }

    showMenu = (event) => {
        this.setState({
            showMenu: true
        });
    }

    closeMenu = (event) => {
        this.setState({ showMenu: false })
    }
}
export default NavUser;