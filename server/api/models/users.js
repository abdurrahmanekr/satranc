const database = require('../../database');
const sm = require('sqlmaster');

const UserPassword = require('./userPassword');

class Users {
    insert(user) {
        var query = sm
        .from('users')
        .insert({
            name: user.name,
            email: user.email,
            date: new Date(),
        })
        .returning('id')
        .exec();

        return new Promise((resolve, reject) => {
            database.execute(query, (err, res) => {
                if (err !== null) {
                    reject(err)
                } else {
                    UserPassword.insert(res.rows[0].id, user.password).then(res => {
                        resolve(true);
                    }, reject);
                }
            })
        })
    }

    isExist(email, password) {
        var query = sm
        .from('users');

        if (password) {
            query
            .join('user_password', [
                { id: 'id' },
            ])
            .where('email = :email AND password = :password', {
                ':email': email,
                ':password': UserPassword.crypto(password),
            })
        } else {
            query
            .where('email = :email', {
                ':email': email
            })
        }

        query = query
        .select([
            ["id", "users.id"],
            "email",
        ])
        .exec();

        return new Promise((resolve, reject) => {
            database.execute(query, (err, res) => {
                if (err !== null) {
                    reject(err)
                } else {
                    if (res.rows.length > 0)
                        return resolve(res.rows[0]); // kullanıcı var
                    return resolve(false); // kullanıcı eklenmemiş
                }
            })
        })
    }
}

module.exports = new Users();
