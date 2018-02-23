const {
	user,
	register,
	validate,
} = require('./controllers');

const Connector = require('../socket');

module.exports = {
	post: {
		'/v1/user': user,
		'/v1/register': register,
		'/v1/validate': validate,
	},
	get: {
        '/app': (req, res) => {
            res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Socket Test</title>
</head>
<body>
    <div id="result">Bağlantı Yok</div> 

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.slim.js"></script>
    <script>
        var socket = io('http://localhost:3000');
        socket.on('connect', function () {
            setInterval(() => {
                socket.emit('getSession');
            }, 5000);
        })

        socket.on('onSession', (session) => {
            document.getElementById('result').innerHTML = JSON.stringify(session);
        })

        socket.on('oyunIstegi', () => {
            alert('istek geldi');
        })
    </script>
</body>
</html>`);
        },
        '/': (req, res) => {
            var socket = null;
            var list = Connector.io.sockets.connected;
            for (var key in list) {
                if (list[key].handshake.sessionID === req.sessionID) {
                    socket = list[key];
                }
            }
            if (socket !== null) {
                console.log('bu isteği atan kullanıcı socket"e bağlı');
                socket.emit('oyunIstegi');
            }
            res.end();
        },
	},
}