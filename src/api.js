import axios from 'axios';

const base_url = "https://my-nc-knews.herokuapp.com/api";

export const getArticleById = async (article_id) => {
    const { data } = await axios.get(`${base_url}/articles/${article_id}`);
    return data;
};

export const getCommentsByArticleId = async (article_id) => {
    const {
        data: { comments }
    } = await axios.get(`${base_url}/articles/${article_id}/comments`)
    return comments;
}

export const deleteArticle = async (article_id) => {
    await axios.delete(`${base_url}/articles/${article_id}`);
}

export const getArticles = async () => {
    const {
        data: { articles }
    } = await axios.get(`${base_url}/articles`);
    return articles;
}

// todo: for Topics/Tabs/Tab
export const getArticlesByTopic = async (topic) => {
    const {
        data: { articles }
    } = await axios.get(`${base_url}/topics/${topic}/articles`)
    return articles;
}

export const getArticlesByAuthor = async (name) => {
    // console.log(name)
    const {
        data: { articles }
    } = await axios.get(`${base_url}/articles/user/${name}`);
    // console.log(articles)
    return articles;
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
