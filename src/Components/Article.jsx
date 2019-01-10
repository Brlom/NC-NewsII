import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './Interactive/CommentForm';
import * as api from '../api';
import { Link } from '@reach/router';
import moment from 'moment';

class Article extends Component {
    state = {
        article: {},
        comments: [],
        currentVotes: 0,
        openButton: false,
    }
    render() {
        const { article, currentVotes, comments, openButton } = this.state;
        if (article.topic) {
            return (
                <div className="articleRender">
                    <h1>{article.title}</h1>
                    <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id)} disabled={currentVotes === 1} >⬆</button>
                    <span className="voteCount">{article.votes}</span>
                    <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id)} disabled={currentVotes === -1} >⬇</button>
                    <Link to={`/users/${article.author}`}>{article.author}</Link>
                    {" | "}
                    {moment(article.created_at).fromNow()}
                    <p>{article.body}</p>
                    <hr />
                    <div className="articleBottomContainer"></div>
                    {openButton ?
                        <div>
                            <CommentForm user={this.props.user} comments={comments} commentAdded={this.commentAdded} openButton={openButton} />
                            {comments.map(comment => {
                                return (
                                    <Comment key={comment.comment_id} path={`/articles/${article.article_id}/comments`} comment={comment} article={article} user={this.props.user} openButton={openButton} />
                                );
                            })}
                        </div>
                        : <button type="submit" onClick={() => this.handleOpenButton}>Load Comments</button>
                    }
                    {/* if (openButton) {
                        return (
                            <CommentsForm user={this.props.user} comments={comments} commentAdded={this.commentAdded} openButton={openButton} />
                        {comments.map(comment => {
                            return (
                                <Comments key={comment.comment_id} path={`/articles/${article.article_id}/comments`} comment={comment} article={article} user={this.props.user} openButton={openButton} />
                            );
                        })}
                        )
                    } else {
            return (
                <button type="submit" onClick={() => this.handleOpenButton}>Load Comments</button>
                        );
                    } */}
                </div>
            );
        }
        return (
            <div>
                <h1>{article.title}</h1>
                <button className="voteButton upVote" onClick={this.handleUpVote(() => article.article_id)} disabled={currentVotes === 1} >⬆</button>
                <span className="voteCount">0{article.votes}</span>
                <button className="voteButton downVote" onClick={this.handleDownVote(() => article.article_id)} disabled={currentVotes === -1} >⬇</button>
                <Link to={`/users/${article.author}`}>{article.author}</Link>
                {" | "}
                {moment(article.created_at).fromNow()}
                <p>{article.body}</p>
                <hr></hr>
                <div className="articleBottomContainer"></div>
            </div>
        )
    }

    commentAdded = (comment) => {
        comment.author = this.props.user.username;
        const joined = [comment].concat(this.state.comments);
        this.setState({ comments: joined })
    }

    handleOpenButton = (event) => {
        event.preventDefault();
        this.setState({
            buttonOpen: true
        })
    }

    handleUpVote = (article_id) => {
        api.voteArticle(article_id, 1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += 1;
            this.setState({ article: newArticle, currentVotes: this.state.currentVotes + 1 })
        })
    }

    handleDownVote = (article_id) => {
        api.voteArticle(article_id, -1).then(() => {
            const newArticle = this.state.article;
            newArticle.votes += -1;
            this.setState({ article: newArticle, currentVotes: this.state.currentVotes - 1 })
        })
    }

    componentDidMount() {
        const { article_id } = this.props;
        api.getArticleById(article_id).then(article => {
            this.setState({
                article
            });
        });
        api.getCommentsByArticleId(article_id).then(comments => {
            this.setState({
                comments
            });
        });
    }

}

export default Article;