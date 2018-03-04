const {
    user,
    register,
    validate,
    game,
    auth,
    callback,
    home,
} = require('./controllers');
const express = require('express');
const path = require('path');
const passport = require('passport');

module.exports = {
    post: {
        '/v1/user': user,
        '/v1/register': register,
        '/v1/validate': validate,
        '/v1/game': game,
        '/v1/auth': auth,
    },
    get: {
        '/': home,
        '/v1/auth': auth,
        '/v1/auth/callback/error': callback.error,
        '/v1/auth/callback/google': [
            passport.authenticate('google', { failureRedirect: '/v1/auth/callback/error' }),
            callback.success,
        ]
    },
    use: {
        '/examples': express.static(path.join(__dirname, '../examples'))
    },
}
