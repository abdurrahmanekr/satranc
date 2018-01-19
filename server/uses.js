const session = require('express-session');

module.exports = (app) => {
    // oturum modeli
    app.use(session({
        secret: "gizli-anahtar",
        resave: false,
        saveUninitialized: true,
    }));
};
