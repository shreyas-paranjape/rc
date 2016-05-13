var keystone = require('keystone');
var Ride = keystone.list('Ride');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'cancel';

	view.render('cancel');

};
