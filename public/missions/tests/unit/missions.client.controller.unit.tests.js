// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Missions' module unit test suite
describe('Testing Missions Controller', function() {
	// Define global variables
	var _scope, MissionsController;

	// Define a pre-tests function
	beforeEach(function() {
		// Load the 'mean' module
		module('mean');

		// Add a new Jasmine matcher
		jasmine.addMatchers({
			toEqualData: function(util, customEqualityTesters) {
				return {
					compare: function(actual, expected) {
						return {
							pass: angular.equals(actual, expected)
						};
					}
				};
			}
		});

		// Use the 'inject' method to inject services
		inject(function($rootScope, $controller) {
			// Create a mock scope object
			_scope = $rootScope.$new();

			// Create a new mock controller
			MissionsController = $controller('MissionsController', {
				$scope: _scope
			});
		});
	});

	// Test the 'find' method
	it('Should have a find method that uses $resource to retrieve a list of Missions', inject(function(Missions) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend) {
			// Create a sample Mission
			var sampleMission = new Missions({
				title: 'An Mission about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample Missions list
			var sampleMissions = [sampleMission];

			// Define a request assertion
			$httpBackend.expectGET('api/Missions').respond(sampleMissions);

			// Call the controller's 'find' method
			_scope.find();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.Missions).toEqualData(sampleMissions);
		});
	}));

	// Test the 'findOne' method
	it('Should have a findOne method that uses $resource to retreive a single of Mission', inject(function(Missions) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend, $routeParams) {
			// Create a sample Mission
			var sampleMission = new Missions({
				title: 'An Mission about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the 'MissionId' route parameter
			$routeParams.MissionId = 'abcdef123456789012345678';

			// Define a request assertion
			$httpBackend.expectGET(/api\/Missions\/([0-9a-fA-F]{24})$/).respond(sampleMission);

			// Call the controller's 'findOne' method
			_scope.findOne();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.Mission).toEqualData(sampleMission);
		});
	}));
});