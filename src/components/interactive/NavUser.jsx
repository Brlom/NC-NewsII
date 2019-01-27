import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import MediaQuery from 'react-responsive';

class NavUser extends Component {
    state = {
        showMenu: false,
    }
    render() {
        return (
            <React.Fragment>
                <button className="dropbtn" onClick={this.showMenu}>{this.props.user.name}
                    <MediaQuery query="(min-device-width: 600px)">
                        <img src={this.props.user.avatar_url} alt="user avatar" width="20"></img>
                    </MediaQuery>
                    <FontAwesomeIcon icon={faAngleDown} /></button>
                {
                    this.state.showMenu
                        ? (
                            <div className="dropDownContent" >
                                <a href="/topics/articles/new">New Article</a>
                                <a href="/" className="logoutSubmit" onClick={this.props.handleLogout}>Log out</a>
                            </div>
                        )
                        : (
                            ""
                        )
                }
            </React.Fragment>
        );
    }

    showMenu = (event) => {
        this.setState((state) => {
            return { showMenu: !state.showMenu }
        });
    }

}
export default NavUser;