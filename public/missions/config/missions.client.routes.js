// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'Missions' module routes
angular.module('Missions').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/Missions', {
			templateUrl: 'Missions/views/list-Missions.client.view.html'
		}).
		when('/Missions/create', {
			templateUrl: 'Missions/views/create-Mission.client.view.html'
		}).
		when('/Missions/:MissionId', {
			templateUrl: 'Missions/views/view-Mission.client.view.html'
		}).
		when('/Missions/:MissionId/edit', {
			templateUrl: 'Missions/views/edit-Mission.client.view.html'
		});
	}
]); 