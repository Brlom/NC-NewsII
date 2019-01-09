import React, { Component } from 'react';
import * as api from '../../api';
// import Suggestions from './Suggestions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
    state = {
        articles: [],
        query: "",
        showMenu: false,
    }

    render() {
        return (
            <React.Fragment>
                <button className="searchNavButton" onClick={this.showMenu}>Search<FontAwesomeIcon icon={faAngleDown} /></button>
                {
                    this.state.showMenu
                        ? (
                            <form className="searchInput" ref={(element) => { this.dropdownMenu = element; }} onSubmit={this.handleSubmit}>
                                <input
                                    placeholder="Search for..."
                                    ref={input => this.search = input}
                                    onChange={this.handleInputChange}
                                />
                                <button className="searchDropdown" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                            </form>
                        )
                        : (
                            null
                        )
                }
            </React.Fragment>
        )
    }

    // handleInputChange = () => {
    //     this.setState({
    //         query: this.search.value
    //     }, () => {
    //         if (this.state.query && this.state.query.length > 1) {
    //             if (this.state.query.length % 2 === 0) {
    //                 this.getInfo()
    //             }
    //         } else if (!this.state.query) {
    //         }
    //     })
    // }

    componentDidMount() {
        this.fetchArticles();
    }

    handleInputChange = (event) => {
        console.log(event.target)
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    fetchArticles = () => {
        api.getArticles().then((articles) => {
            this.setState({
                articles
            })
        })
    }

    showMenu = (event) => {
        this.setState((state) => {
            return { showMenu: !state.showMenu }
        })
    }

}

export default Search;
