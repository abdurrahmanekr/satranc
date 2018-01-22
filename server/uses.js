const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

module.exports = (app) => {

    const client = redis.createClient();

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
