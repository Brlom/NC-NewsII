import React, { Component } from 'react';
import * as api from '../../api';
import filteredArticles from '../../utils/filteredArticles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { navigate } from '@reach/router';

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
                            <form className="searchInput" onSubmit={this.handleSubmit}>
                                <input
                                    placeholder="Search for..."
                                    ref={input => this.search = input}
                                    onChange={this.handleInputChange}
                                    name="query"
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

    componentDidMount() {
        this.fetchArticles();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { query, articles } = this.state;
        const newArticles = filteredArticles({ searchText: query, maxResults: 10, articles: articles });
        // this.props.setArticleQuery(query);
        this.props.setArticleSearchResults(newArticles);
        navigate("/result")
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