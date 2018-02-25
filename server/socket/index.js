const Wildemitter = require('wildemitter');

class Connector {
    constructor() {
        this.io = null;
    }

    init(io) {
        this.io = io;
        this.connect();
    }

    connect() {
        this.io.on('connection', (socket) => {
            console.log('bir kullanıcı bağlandı');
            socket.on('disconnect', () => {
                console.log('bir kullanıcı koptu');
            })
        })
    }
}

Wildemitter.mixin(Connector);

module.exports = new Connector();
