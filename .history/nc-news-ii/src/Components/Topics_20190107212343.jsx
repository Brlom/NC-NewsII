import React, { Component } from 'react';
import * as api from '../api';
import Tabs from '../Components/Tabs';

class Topics extends Component {
    state = {
        topics: [],
        articles: {},
    }
    render() {
        const { topics, articles } = this.state;
        if (topics.length > 0) {
            return (
                <Tabs>
                    {topics.map((topic) => {
                        return (
                            <div key={topic.slug} label={topic.slug}>
                                <ul>
                                    {articles[topic.slug].map((article) => {
                                        return (
                                            <li>{article.body}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </Tabs>
            )
        } else {
            return (
                <div>
                    <h1>Article Library</h1>
                    <Tabs>
                        <div label="Coding">
                            Render All Coding Articles!
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
                        </div>
                    </Tabs>
                </div>
            );
        }
    }

    componentDidMount() {
        this.fetchTopics();
        this.state.topics.map((topic) => {
            return this.fetchArticles(topic.slug)
        });
        console.log(this.state.articles)
    }

    fetchTopics() {
        api.getTopics().then(topics => {
            this.setState({ topics });
        });
    }

    fetchArticles(topic) {
        api.getArticlesByTopic(topic).then(articles => {
            let newArticles = Object.assign({}, this.state.articles)
            newArticles[topic] = articles
            this.setState({ articles })
        });
    }

}

export default Topics;