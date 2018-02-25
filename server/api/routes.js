const {
    user,
    register,
    validate,
    game,
} = require('./controllers');
const express = require('express');
const path = require('path');

console.log(path.join(__dirname, '../examples'));

module.exports = {
    post: {
        '/v1/user': user,
        '/v1/register': register,
        '/v1/validate': validate,
        '/v1/game': game,
    },
    get: {
    },
    use: {
        '/examples': express.static(path.join(__dirname, '../examples'))
    },
}
