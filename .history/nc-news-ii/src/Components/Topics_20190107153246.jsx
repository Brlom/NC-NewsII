import React, { Component } from 'react';
// import { Link, Router } from '@reach/router';
import * as api from '../api';
import Tabs from '../Components/Tabs';

class Topics extends Component {
    state = {
        topics: [],
        articles: [],
    }
    render() {
        const { topics } = this.state;
        return (
            <div>
                <h1>Library</h1>
                <Tabs>
                    {topics.map(topic => {
                        return (
                            <div label={topic}>
                                <p></p>
                            </div>
                        )
                    })}
                    {/* <div label="Gator">
                        See ya later, <em>Alligator</em>!
                        </div>
                    <div label="Croc">
                        After 'while, <em>Crocodile</em>!
                        </div>
                    <div label="Sarcosuchus">
                        Nothing to see here, this tab is <em>extinct</em>!
                        </div> */}
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
        api.getArticles().then(article => {
            this.setState({ article });
        });
    }
}

export default Topics;