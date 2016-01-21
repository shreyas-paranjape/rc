var keystone = require('keystone');
var async = require('async');
var Ride = keystone.list('Ride');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.validationErrors = {};
	locals.enquirySent = false;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('post', {
		action: 'submit'
	}, function(next) {
		console.log("req.body" + JSON.stringify(req.body));
		var newQuery = new Ride.model(),
			updater = newQuery.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: false,
			fields: 'name, email, contact, pax, date, time, trip, message',
			errorMessage: 'Cannot load'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err.errors);
			} else {
 				locals.enquirySent = true;
			}

		});
		next();
	});
	// Render the view
	view.render('index');

};
