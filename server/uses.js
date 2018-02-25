const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const database = require('./database');
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
const Connector = require('./socket');
const http = require('http');

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
        name: 'satranc.sid',
        secret: 'gizli-anahtar',
        resave: true,
        saveUninitialized: true,
    });

    app.use(session1);

    app.use(bodyParser.json());
    app.use(cookieParser());

    for(var key in routes.post) {
        app.post(key, routes.post[key]);
    }

    for(var key in routes.get) {
        app.get(key, routes.get[key]);
    }

    for(var key in routes.use) {
        app.use(key, routes.use[key]);
    }

    const server = http.createServer(app);
    const io = socket(server);

    server.listen({
        port: 3000,
        host: 'localhost',
    }, () => {
        console.log('çalışıyor');
    });

    Connector.init(io);
}
