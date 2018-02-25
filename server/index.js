const express = require('express');
const uses = require('./uses');

// sunucumuzu oluşturalım
const app = express();
uses(app);
