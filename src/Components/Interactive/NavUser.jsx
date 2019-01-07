import React, { Component } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

class NavUser extends Component {
    state = {
        showMenu: false,
        dropdownMenu: '',
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
                                    <li><Link to="/topic/articles/new" className="newTopicArticle">New Topic/Article</Link></li>
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
        event.preventDefault();
        this.setState({
            showMenu: true
        }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu = (event) => {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }
}

export default NavUser;