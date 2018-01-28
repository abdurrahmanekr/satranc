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

    select() {
        return new Promise((resolve, reject) => {
            this.client.query('SELECT RTRIM(name) as name, RTRIM(email) as email, date FROM users', (err, res) => {
                if (err !== null) {
                    reject(err)
                } else {
                    resolve(res.rows);
                }
            })
        })
    }
}

module.exports = new Database();