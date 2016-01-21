var keystone = require('keystone');
var Ride = keystone.list('Ride');
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', {
		action: 'submit'
	}, function(next) {
		var newQuery = new Ride.model(),
			updater = newQuery.getUpdateHandler(req);
		console.log("asdf" + req.body.name);
		updater.process(req.body, {
			flashErrors: false,
			fields: 'name, email, contact, pax, date, time, trip, message',
			errorMessage: 'Cannot load'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err.errors);
			} else {
				locals.enquirySubmitted = true;
			}
		});
		next();
	});
	view.render('contact');

};
