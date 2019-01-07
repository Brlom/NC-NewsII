import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import * as api from '../api';

class Topics extends Component {
    state = {
        topics: [],
    }
    render() {
        return (
            <div>
                <h1>Library</h1>

                <Router>
                    <Tabs />
                    <Link></Link>
                </Router>
            </div>
        );
    }

    componentDidMount() {
        api.getTopics().then(topics => {
            this.setState({ topics: topics, isLoading: false });
        });
    }
}

export default Topics;