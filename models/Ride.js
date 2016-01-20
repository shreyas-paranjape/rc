var keystone = require('keystone');
var Types = keystone.Field.Types;
var Ride = new keystone.List('Ride');

Ride.add({
	name: {
		type: Types.Name,
		required: true
	},
	email: {
		type: Types.Email,
	},
	contact: {
		type: String
	},
	pax: {
		type: String
	},
	date: {
		type: String
	},
	time: {
		type: String
	},
	trip: {
		type: String
	},
	message: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

Ride.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Ride.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Ride.schema.methods.sendNotificationEmail = function(callback) {
	if ('function' !== typeof callback) {
		callback = function() {};
	}

	var mailBody = {};
	mailBody.name = this.name;
	mailBody.email = this.email;
	mailBody.contact = this.contact;
	mailBody.pax = this.pax;
	mailBody.date = this.date;
	mailBody.time = this.time;
	mailBody.trip = this.trip;
	mailBody.message = this.message;
	mailBody.createdAt = this.createdAt;

	new keystone.Email('ride').send({
		to: 'rediscoverycruises@gmail.com',
		fromName: 'Rediscovery Cruises',
		fromEmail: 'contact@rediscovery.com',
		subject: 'Ride Request',
		mailBody: mailBody
	}, callback);
	console.log("Mail Sent");
	console.log(callback);

};

Ride.defaultSort = '-createdAt';
Ride.defaultColumns = 'name, email,';
Ride.register();
