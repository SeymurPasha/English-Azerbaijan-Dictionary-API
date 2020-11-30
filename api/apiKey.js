const Users = require('./models/user');
const MAX = process.env.API_MAX || 25;


const genKey = () => {
    return [...Array(30)]
    .map((e) => ((Math.random()*36) | 0).toString(36))
    .join('');
};

module.exports = genKey();
