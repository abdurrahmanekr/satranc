const {
	user,
	register,
	validate,
} = require('./controllers');

module.exports = {
	post: {
		'/v1/user': user,
		'/v1/register': register,
		'/v1/validate': validate,
	},
	get: {

	},
}