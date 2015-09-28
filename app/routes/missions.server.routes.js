// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	Missions = require('../../app/controllers/Missions.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'Missions' base routes
	app.route('/api/Missions')
	   .get(Missions.list)
	   .post(users.requiresLogin, Missions.create);

	// Set up the 'Missions' parameterized routes
	app.route('/api/Missions/:MissionId')
	   .get(Missions.read)
	   .put(users.requiresLogin, Missions.hasAuthorization, Missions.update)
	   .delete(users.requiresLogin, Missions.hasAuthorization, Missions.delete);

	// Set up the 'MissionId' parameter middleware
	app.param('MissionId', Missions.MissionByID);
};
