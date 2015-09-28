// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Mission = mongoose.model('Mission');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new Missions
exports.create = function(req, res) {
	// Create a new Mission object
	var Mission = new Mission(req.body);

	// Set the Mission's 'creator' property
	Mission.creator = req.user;

	// Try saving the Mission
	Mission.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Mission 
			res.json(Mission);
		}
	});
};

// Create a new controller method that retrieves a list of Missions
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of Missions
	Mission.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, Missions) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Mission 
			res.json(Missions);
		}
	});
};

// Create a new controller method that returns an existing Mission
exports.read = function(req, res) {
	res.json(req.Mission);
};

// Create a new controller method that updates an existing Mission
exports.update = function(req, res) {
	// Get the Mission from the 'request' object
	var Mission = req.Mission;

	// Update the Mission fields
	Mission.title = req.body.title;
	Mission.content = req.body.content;

	// Try saving the updated Mission
	Mission.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Mission 
			res.json(Mission);
		}
	});
};

// Create a new controller method that delete an existing Mission
exports.delete = function(req, res) {
	// Get the Mission from the 'request' object
	var Mission = req.Mission;

	// Use the model 'remove' method to delete the Mission
	Mission.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the Mission 
			res.json(Mission);
		}
	});
};

// Create a new controller middleware that retrieves a single existing Mission
exports.MissionByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single Mission 
	Mission.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, Mission) {
		if (err) return next(err);
		if (!Mission) return next(new Error('Failed to load Mission ' + id));

		// If an Mission is found use the 'request' object to pass it to the next middleware
		req.Mission = Mission;

		// Call the next middleware
		next();
	});
};

// Create a new controller middleware that is used to authorize an Mission operation 
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the Mission send the appropriate error message
	if (req.Mission.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};