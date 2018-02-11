const {
	Users,
} = require('../models');

module.exports = (request, response) => {
	switch(request.query.type) {
		case 'user':
			var user = request.body || {};

			Users.isExist(user.email).then(exist => {
				if (exist === true) {
					response.status(200);
					response.send({
						error_code: 1,
						message: 'This user alright exist.'
					});
					return
				}

				Users.insert(user).then(res => {
					response.status(201);
					response.send('');
				}, err => {
					response.status(500);
					response.send(err.message);
				})				
			}, err => {
				response.status(500);
				response.send(err.message);
			})
			break;
		default: 
			response.status(400);
			response.send('');
			break;
	}
}