// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Missions' controller
angular.module('Missions').controller('MissionsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Missions',
    function($scope, $routeParams, $location, Authentication, Missions) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new Missions
        $scope.create = function() {
        	// Use the form fields to create a new Mission $resource object
            var Mission = new Missions({
                title: this.title,
                content: this.content
            });

            // Use the Mission '$save' method to send an appropriate POST request
            Mission.$save(function(response) {
            	// If an Mission was created successfully, redirect the user to the Mission's page 
                $location.path('Missions/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of Missions
        $scope.find = function() {
        	// Use the Mission 'query' method to send an appropriate GET request
            $scope.Missions = Missions.query();
        };

        // Create a new controller method for retrieving a single Mission
        $scope.findOne = function() {
        	// Use the Mission 'get' method to send an appropriate GET request
            $scope.Mission = Missions.get({
                MissionId: $routeParams.MissionId
            });
        };

        // Create a new controller method for updating a single Mission
        $scope.update = function() {
        	// Use the Mission '$update' method to send an appropriate PUT request
            $scope.Mission.$update(function() {
            	// If an Mission was updated successfully, redirect the user to the Mission's page 
                $location.path('Missions/' + $scope.Mission._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single Mission
        $scope.delete = function(Mission) {
        	// If an Mission was sent to the method, delete it
            if (Mission) {
            	// Use the Mission '$remove' method to delete the Mission
                Mission.$remove(function() {
                	// Remove the Mission from the Missions list
                    for (var i in $scope.Missions) {
                        if ($scope.Missions[i] === Mission) {
                            $scope.Missions.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the Mission '$remove' method to delete the Mission
                $scope.Mission.$remove(function() {
                    $location.path('Missions');
                });
            }
        };
    }
]);