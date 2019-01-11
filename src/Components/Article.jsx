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
        commentOrderDirection: "desc",
        commentSortBy: "created_at",
    }
    render() {
        const { article, currentVotes, comments, openButton, commentOrderDirection, commentSortBy } = this.state;
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
                    {openButton || this.state.comments.length < 1 ?
                        <div>
                            <CommentForm
                                article={article.article_id}
                                user={this.props.user}
                                comments={comments}
                                commentAdded={this.commentAdded}
                                commentOrderingChanged={this.commentOrderingChanged}
                                commentOrderDirection={commentOrderDirection}
                                commentSortBy={commentSortBy}
                                commentDirectionChanged={this.commentDirectionChanged}
                            />
                            {
                                comments.map(comment => {
                                    return (
                                        <Comment
                                            key={comment.comment_id}
                                            path={`/articles/${article.article_id}/comments`}
                                            comment={comment}
                                            article={article}
                                            user={this.props.user}
                                            commentDeleted={this.commentDeleted} />
                                    );
                                })
                            }
                        </div>
                        : <button type="submit" onClick={this.handleOpenButton}>Load Comments</button>
                    }
                </div>
            );
        }
        return (
            <div>
                <h1>{article.title}</h1>
                <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id)} disabled={currentVotes === 1} >⬆</button>
                <span className="voteCount">0{article.votes}</span>
                <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id)} disabled={currentVotes === -1} >⬇</button>
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
        const joined = [comment].concat(this.state.comments);
        this.setState({
            comments: joined
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.commentOrderDirection !== this.state.commentOrderDirection || prevState.commentSortBy !== this.state.commentSortBy) {
            const { article_id } = this.props;
            let query = `sort_by=${this.state.commentSortBy}`;
            query += this.state.commentOrderDirection === "desc" ? "" : "&sort_ascending=true"
            api.getCommentsByArticleId(article_id, query).then((comments) => {
                this.setState({
                    comments: comments
                })
            })
        }
    }

    commentOrderingChanged = (sort_by) => {
        this.setState({
            commentSortBy: sort_by
        });
    }

    commentDirectionChanged = (orderingDirection) => {
        this.setState({
            commentOrderDirection: orderingDirection
        })
    }

    commentDeleted = (deletedComment) => {
        let newComments = [].concat(this.state.comments);
        const index = newComments.findIndex((comment) => comment.comment_id === deletedComment.comment_id);
        newComments.splice(index, 1);
        this.setState({
            comments: newComments
        })
    }

    handleOpenButton = (event) => {
        event.preventDefault();
        this.setState({
            openButton: true
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