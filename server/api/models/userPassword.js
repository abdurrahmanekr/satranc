const database = require('../../database');
const sm = require('sqlmaster');
const crypto = require('crypto');

class UserPassword {
    insert(id, password) {
        return new Promise((resolve, reject) => {
            if (!password) {
                reject(new Error('password is null'));
            }

            password = crypto.pbkdf2Sync(password, 'satranc', 100000, 64, 'sha512').toString('hex');

            var query = sm
            .from('user_password')
            .insert({
                id: id,
                password: password
            })
            .exec();

            database.execute(query, (err, res) => {
                if (err !== null) {
                    reject(err)
                } else {
                    resolve(true);
                }
            })
        })
    }
}

module.exports = new UserPassword();