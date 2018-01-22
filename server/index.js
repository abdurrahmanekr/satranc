const express = require('express');
const uses = require('./uses');

// sunucumu oluşturalım
const app = express();
uses(app);
// yayınlayacağım port
const port = 3000;


app.get('/', (req, res) => {
    res.send(req.session);
})

app.listen(port, () => {
    console.log('çalışıyor');
})