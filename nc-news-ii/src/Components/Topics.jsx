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
                <div>
                    <h1>Article Library</h1>
                    <Tabs>
                        {topics.map((topic) => {
                            if (articles && articles[topic.slug]) {
                                return (
                                    <div key={topic.slug} label={topic.slug}>
                                        <ul>
                                            {articles[topic.slug].map((article) => {
                                                return (
                                                    <div key={article.article_id}>
                                                        <li>{article.title}</li>
                                                        <hr></hr>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={topic.slug} label={topic.slug}>
                                    </div>
                                )
                            }
                        })}
                    </Tabs>
                </div>
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
    }

    fetchTopics() {
        api.getTopics().then(topics => {
            topics.map((topic) => {
                return this.fetchArticles(topic.slug)
            });
            this.setState({ topics: topics });
        });
    }

    fetchArticles(topic) {
        api.getArticlesByTopic(topic).then(articles => {
            let newArticles = Object.assign({}, this.state.articles)
            newArticles[topic] = articles
            this.setState({ articles: newArticles })
        });
    }

}

export default Topics;