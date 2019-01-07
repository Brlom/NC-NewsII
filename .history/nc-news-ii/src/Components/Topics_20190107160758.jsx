import React, { Component } from 'react';
// import { Link, Router } from '@reach/router';
import * as api from '../api';
import Tabs from '../Components/Tabs';

class Topics extends Component {
    state = {
        articles: [],
    }
    render() {
        const { topics } = this.state;
        return (
            <div>
                <h1>Library</h1>
                <Tabs>
                    <div label="Coding">
                        See ya later, <em>Alligator</em>!
                    </div>
                    <div label="Football">
                        After 'while, <em>Crocodile</em>!
                    </div>
                    <div label="Cooking">
                        Nothing to see here, this tab is <em>extinct</em>!
                    </div>
                    <div label="All Articles">
                        Nothing to see here, this tab is <em>extinct</em>!
                    </div>
                </Tabs>
            </div>
        );
    }

    componentDidMount() {
        this.fetchTopics();
        this.fetchArticles();
    }

    fetchTopics() {
        api.getTopics().then(topics => {
            this.setState({ topics });
        });
    }

    fetchArticles() {
        api.getArticlesByTopic().then(articles => {
            this.setState({ articles });
        });
    }
}

export default Topics;