import axios from 'axios';

const base_url = "https://my-nc-knews.herokuapp.com/api";

export const getArticles = async (query) => {
    if (query) {
        const {
            data: { articles }
        } = await axios.get(`${base_url}/articles?${query}`);
        return articles;
    } else {
        const {
            data: { articles }
        } = await axios.get(`${base_url}/articles?limit=50`);
        return articles;
    }
}

export const getArticleById = async (article_id) => {
    const { data } = await axios.get(`${base_url}/articles/${article_id}`);
    return data;
};

export const getArticlesByTopic = async (topic, query) => {
    if (query) {
        const {
            data: { articles }
        } = await axios.get(`${base_url}/topics/${topic}/articles?${query}`);
        return articles;
    } else {
        const {
            data: { articles }
        } = await axios.get(`${base_url}/topics/${topic}/articles`)
        return articles;
    }
}

export const getArticlesByAuthor = async (name) => {
    const {
        data: { articles }
    } = await axios.get(`${base_url}/articles/user/${name}`);
    return articles;
}

export const getCommentsByArticleId = async (article_id, query) => {
    if (query) {
        const {
            data: { comments }
        } = await axios.get(`${base_url}/articles/${article_id}/comments?${query}`);
        return comments;
    } else {
        const {
            data: { comments }
        } = await axios.get(`${base_url}/articles/${article_id}/comments`)
        return comments;
    }
}

export const submitArticle = async (topicValue, articleBody, titleValue, user_id) => {
    const {
        data: { article }
    } = await axios.post(`${base_url}/topics/${topicValue}/articles`, { topic: topicValue, body: articleBody, title: titleValue, user_id: user_id });
    return article;
}

export const submitComment = async (article_id, user_id, body) => {
    const {
        data
    } = await axios.post(`${base_url}/articles/${article_id}/comments`, { user_id: user_id, body: body });
    return data;
}

export const deleteArticle = async (article_id) => {
    await axios.delete(`${base_url}/articles/${article_id}`);
}

export const deleteComment = async (article_id, comment_id) => {
    await axios.delete(`${base_url}/articles/${article_id}/comments/${comment_id}`);
}

export const getTopics = async () => {
    const {
        data: { topics }
    } = await axios.get(`${base_url}/topics`);
    return topics;
};

export const getUsers = async () => {
    const {
        data: { users }
    } = await axios.get(`${base_url}/users`);
    return users;
}

export const getUserByUsername = async (username) => {
    const {
        data
    } = await axios.get(`${base_url}/users/${username}`)
    return data;
}

export const voteArticle = async (article_id, amount) => {
    const changeVotes = { inc_votes: amount };
    const { data } = await axios.patch(`${base_url}/articles/${article_id}`, changeVotes);
    return data;
}

export const voteComment = async (article_id, comment_id, amount) => {
    const changeVotes = { inc_votes: amount };
    const { data } = await axios.patch(`${base_url}/articles/${article_id}/comments/${comment_id}`, changeVotes);
    return data;
}