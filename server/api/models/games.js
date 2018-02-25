const Connector = require('../../socket');

class Games {
    getSocket(socketID, sessionID) {
        return new Promise((resolve, reject) => {
            var socket;
            var list = Connector.io.sockets.connected;
            if (socketID) {
                socket = list[socketID];

                if (socket !== undefined) {
                    return resolve(socket);
                }
            }
            reject({
                error_code: 3,
                message: 'Socket not found.',
            });
        });
    }
}

module.exports = new Games();
