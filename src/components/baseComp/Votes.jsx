// import React, { Component } from 'react';

// class Votes extends Component {
//     state = {
//         currentVotes: 0,
//     }
//     render() {
//         return (
//             <div>
//                 <button className="voteButton upVote" onClick={() => this.handleUpVote(article.article_id)} disabled={currentVotes === 1} >⬆</button>
//                 <span className="voteCount">{article.votes}</span>
//                 <button className="voteButton downVote" onClick={() => this.handleDownVote(article.article_id)} disabled={currentVotes === -1} >⬇</button>
//             </div>
//         );
//     }

//     handleUpVote = (article_id) => {
//         api.voteArticle(article_id, 1).then(() => {
//             const newArticle = this.state.article;
//             newArticle.votes += 1;
//             this.setState({ article: newArticle, currentVotes: this.state.currentVotes + 1 })
//         })
//     }

//     handleDownVote = (article_id) => {
//         api.voteArticle(article_id, -1).then(() => {
//             const newArticle = this.state.article;
//             newArticle.votes += -1;
//             this.setState({ article: newArticle, currentVotes: this.state.currentVotes - 1 })
//         })
//     }

// }

// export default Votes;