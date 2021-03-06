import React, { Component } from 'react';
import * as api from '../api';
import ArticleSummary from '../components/baseComp/ArticleSummary';
import Tabs from '../components/Tabs';
import ajaxLoader from '../utils/ajax-loader.gif';

class Topics extends Component {
    state = {
        topics: [],
        articles: {},
        isLoading: true,
    }
    render() {
        const { topics, articles, isLoading } = this.state;
        if (isLoading) {
            return (
                <React.Fragment key="topics">
                    <img id="loading" src={ajaxLoader} alt="ajax loader circle" height="100" width="100" />
                </React.Fragment>
            );
        }
        if (topics.length > 0) {
            return (
                <div>
                    <h1 className="contentHeader">Article Library</h1>
                    <Tabs>
                        {topics.map((topic) => {
                            if (articles && articles[topic.slug]) {
                                return (
                                    <div key={topic.slug} label={topic.slug}>
                                        <ul>
                                            {articles[topic.slug].map((article) => {
                                                return (
                                                    <ArticleSummary key={article.article_id} article={article} />
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
                    <div className="bottomContainer"></div>
                </div>
            )
        } else {
            return (
                <div></div>
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
            this.setState({ topics: topics, isLoading: false });
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