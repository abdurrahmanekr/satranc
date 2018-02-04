const { Client } = require('pg');
const config = require('../config');

class Database {
    constructor() {
        this.client = null;
    }

    connect() {
        this.client = new Client({
            user: config.db.user,
            database: config.db.name,
            password: config.db.password,
            host: config.db.host,
            port: config.db.port,
        });
        return this.client.connect();
    }

    execute(...args) {
        this.client.query(...args);
    }
}

module.exports = new Database();