import axios from 'axios';

const base_url = "https://my-nc-knews.herokuapp.com/api";

export const getArticles = async () => {
    const {
        data: { articles }
    } = await axios.get(`${base_url}/articles`);
    return articles;
}

export const getArticlesByAuthor = async (name) => {
    const {
        data: { articles }
    } = await axios.get(`${base_url}/articles/user/${name}`);
    return articles;
}

export const deleteArticle = async (article_id) => {
    await axios.delete(`${base_url}/articles/${article_id}`);
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