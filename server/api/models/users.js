const database = require('../../database');

class Users {
	insert(user) {
		var sql = "INSERT INTO users (name, email, date) VALUES ($1, $2, NOW())";
		var values = [user.name, user.email];

		return new Promise((resolve, reject) => {
			database.execute(sql, values, (err, res) => {
				if (err !== null) {
					reject(err)
				} else {
					resolve(true);
				}
			})
		})
	}

	isExist(email) {
		var sql = "SELECT email FROM users WHERE email = $1";
		var values = [email];

		return new Promise((resolve, reject) => {
			database.execute(sql, values, (err, res) => {
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