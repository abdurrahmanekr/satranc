const {
    Games,
} = require('../models');
const Connector = require('../../socket');

module.exports = (request, response) => {
    switch(request.query.event) {
        case 'new':
            // burası istek atanın socket'ini bulmak için gerekli alan
            var cookieIO = request.cookies.io;
            Games.getSocket(cookieIO, request.sessionID).then(socket => {
                socket.wantsToGame = new Date();

                // eğer önceden de istek atmışsa çakışma olmaması için siliniyor
                Connector.off(`player:finded:${socket.id}`);

                // boşta oyuncu bulunduğu zaman çalışıyor
                Connector.on(`player:finded:${socket.id}`, (user) => {
                    Connector.off(`player:finded:${socket.id}`);
                    delete socket.wantsToGame;

                    console.log('oyuncu bulundu');
                });

                // listede wantsToGame olan kişileri buluyor
                var list = Connector.io.sockets.connected;
                for(var key in list) {
                    if (list[key].wantsToGame !== undefined && key !== cookieIO) {
                        Connector.emit(`player:finded:${key}`, list[key]);
                        // bir oyuncu bulduğu için kendine de haber etsin
                        Connector.emit(`player:finded:${cookieIO}`, list[cookieIO]);
                    }
                }

                response.end();
            }, err => {
                response.status(200);
                response.send(err);
            })
            break;
        default:
            response.status(400);
            response.end();
            break;
    }
}
