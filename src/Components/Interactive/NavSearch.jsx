import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

class NavSearch extends Component {
    state = {
        showMenu: false,
    }
    render() {
        return (
            <React.Fragment>
                <button className="searchNavButton" onClick={this.showMenu}>Search<FontAwesomeIcon icon={faAngleDown} /></button>
                {
                    this.state.showMenu
                        ? (
                            <form
                                className="searchInput" ref={(element) => { this.dropdownMenu = element; }} onSubmit={this.handleSubmit}
                            >
                                <input type="text" placeholder="Search.."></input>
                                <button className="searchDropdown" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                            </form>
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

export default NavSearch;