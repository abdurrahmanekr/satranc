const express = require('express');
const session = require('express-session');

const uses = require('./uses');

// sunucumuzu oluşturalım
const app = express();
// yayınlayacağımız port
const port = 3000;


// uygulamamızın kullanması gereklenleri dahil ediyoruz
uses(app);

// sonra da yönlendirmeleri yapalım
app.get('/', (req, res) => {
    // kullanıcıya cevap olarak bunu döndürüyoruz
    res.send('Merhaba Satranç\'a Hoşgeldin!');
})

// uygulamayı yayınlıyoruz
app.listen(port, () => {
    console.log(`Uygulama ${port} portundan sunuluyor`);
})
