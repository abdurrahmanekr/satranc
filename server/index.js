const express = require('express');
const uses = require('./uses');
const database = require('./database');

// sunucumu oluşturalım
const app = express();
uses(app);
// yayınlayacağım port
const port = 3000;


app.get('/', (req, res) => {
    database.select()
    .then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

app.listen(port, () => {
    console.log('çalışıyor');
})