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

	isExist(email) {
        var query = sm
        .from('users')
        .where('email = :email', {
            ':email': email
        })
        .select([
            "email"
        ])
        .exec();


		return new Promise((resolve, reject) => {
			database.execute(query, (err, res) => {
				if (err !== null) {
					reject(err)
				} else {
					if (res.rows.length > 0)
						return resolve(true); // kullanıcı var
					return resolve(false); // kullanıcı eklenmemiş
				}
			})
		})
	}
}

module.exports = new Users();