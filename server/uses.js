const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = (app) => {
    // oturum modeli
    app.use(session({
        store: new RedisStore({ // yeni bir redis bağlantısı
            host: 'localhost',
            port: 6379,
            ttl :  260
        }),
        secret: "gizli-anahtar",
        resave: false,
        saveUninitialized: true,
    }));
};
