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

            socket.on('getSession', () => {
                socket.emit('onSession', socket.handshake.session);
                socket.handshake.session.lastActiveData = new Date();
            })
        })
    }
}

module.exports = new Connector();