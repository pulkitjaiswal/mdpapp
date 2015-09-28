// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Missions' service
angular.module('Missions').factory('Missions', ['$resource', function($resource) {
	// Use the '$resource' service to return an Mission '$resource' object
    return $resource('api/Missions/:MissionId', {
        MissionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);