module.exports = (request, response) => {
    response.send(request.session);
}
