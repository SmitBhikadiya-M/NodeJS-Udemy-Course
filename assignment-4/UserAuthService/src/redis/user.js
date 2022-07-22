const { createClient } = require('redis');

const client = createClient();

const getUser = (username) => {
    return client.hGet('users', `users_${username}`);
}

const setUser = (user) => {
    return client.hSet('users', `users_${user.username}`, JSON.stringify({ ...user, requestCounter: 0 }));
}

const delUser = (username) => {
    return client.hDel('users', `users_${username}`);
}

const connect = () => {
    return client.connect();
};

module.exports = { connect, getUser, setUser, delUser }