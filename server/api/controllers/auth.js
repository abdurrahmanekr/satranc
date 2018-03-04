const passport = require('passport');

module.exports = (request, response, next) => {
    switch (request.query.type) {
        case 'user':
            passport.authenticate('local', (err, user) => {
                if (!err && user) {
                    request.session.auth = true;
                } else {
                    request.session.auth = false;
                }
                response.send({
                    auth: request.session.auth
                })
            })(request, response, next);
            break;
        case 'google':
            passport.authenticate('google', { scope: ['profile'] })(request, response, next);
            break;
    }
}
