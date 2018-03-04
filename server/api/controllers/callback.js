module.exports = {
    success: (request, response) => {
        request.session.auth = true;
        response.redirect('/');
    },
    error: (request, response) => {
        request.session.auth = false;
        response.redirect('/');
    }
}
