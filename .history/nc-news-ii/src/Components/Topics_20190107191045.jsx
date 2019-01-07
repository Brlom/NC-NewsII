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
                <h1>Article Library</h1>
                <Tabs>
                    {topics.map(
                        (topic) => {
                            <div label={topic.slug}><ul><li>{topic.description}</li></ul></div>
                        }
                    )}
                    {/* <div label="Coding">
                        Render All Coding Articles!

                        <ul>

                        </ul>
                    </div>
                    <div label="Football">
                        Render All Football Articles!
                    </div>
                    <div label="Cooking">
                        Render All Cooking Articles!
                    </div>
                    <div label="All Articles">
                        Render All Articles!
                    </div>
                    <div label="Add">
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
        api.getArticlesByTopic().then(articles => {
            this.setState({ articles });
        });
    }
}

export default Topics;