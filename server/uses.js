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
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth2');
const config = require('./config');

const {
    Users,
} = require('./api/models');

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

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(
        new LocalStrategy((username, password, done) => {
            Users.isExist(username, password).then(exist => {
                if (exist !== false) return done(null, exist);
                done(null, false);
            }, err => {
                done(err);
            })
        })
    );

    passport.use(
        new GoogleStrategy({
            clientID: config.google.GOOGLE_CLIENT_ID,
            clientSecret: config.google.GOOGLE_CLIENT_SECRET,
            callbackURL: "/v1/auth/callback/google"
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(JSON.stringify(profile));
            cb(null, profile);
        }
    ));

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
