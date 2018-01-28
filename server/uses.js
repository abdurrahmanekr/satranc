const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const database = require('./database');

module.exports = (app) => {

    const client = redis.createClient();
    database.connect();

    app.use(session({
        store: new RedisStore({
            client: client,
            host: 'localhost',
            port: 6379,
            ttl: 260,
        }),
        secret: 'gizli-anahtar',
        resave: false,
        saveUninitialized: true,
    }))
}
