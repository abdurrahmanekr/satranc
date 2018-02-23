const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const database = require('./database');
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const Connector = require('./socket');
const sharedsession = require("express-socket.io-session");

module.exports = (app) => {

    database.connect();
    
    const client = redis.createClient();
    const session1 = session({
        store: new RedisStore({
            client: client,
            host: 'localhost',
            port: 6379,
            ttl: 260,
        }),
        secret: 'gizli-anahtar',
        resave: true,
        saveUninitialized: true,
    });

    app.use(session1);

    app.use(bodyParser.json());

    for(var key in routes.post) {
        app.use(key, routes.post[key]);
    }

    for(var key in routes.get) {
        app.use(key, routes.get[key]);
    }

    const server = require("http").createServer(app);
    server.listen({
        port: 3000,
        host: '127.0.0.1',
    }, () => {
        console.log('çalışıyor');
    });
    const io = socket(server);
    io.use(sharedsession(session1, {
        autoSave: true
    }));

    Connector.init(io);
}
