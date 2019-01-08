import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import Tabs from '../Components/Tabs';
import { Link } from '@reach/router';
import Icon from '../Images/icon.png';

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
                                                    <div className="topicArticleElements" key={article.article_id}>
                                                        <img src={Icon} alt="NorthCoders News Logo" height="15px"></img>
                                                        <button className="voteButton upVote">⬆</button>
                                                        <span className="voteCount">{article.votes}</span>
                                                        <button className="voteButton downVote">⬇</button>
                                                        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                                                        {" | "}
                                                        <Link to={`/users/${article.author}`}>{article.name}</Link>
                                                        {" | "}
                                                        {moment(article.created_at).fromNow()}
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