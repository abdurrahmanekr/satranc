const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const database = require('./database');
const routes = require('./api/routes');
const bodyParser = require('body-parser');

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

    app.use(bodyParser.json());

    for(var key in routes.post) {
        app.use(key, routes.post[key]);
    }

    for(var key in routes.get) {
        app.use(key, routes.get[key]);
    }
}
