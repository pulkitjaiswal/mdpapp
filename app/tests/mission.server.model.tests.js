// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mission = mongoose.model('Mission');

// Define global variables
var user, Mission;

// Create an 'Mission' model test suite
describe('Mission Model Unit Tests:', function() {
	// Define a pre-tests function
	beforeEach(function(done) {
		// Create a new 'User' model instance
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		// Save the new 'User' model instance
		user.save(function() {
			Mission = new Mission({
				title: 'Mission Title',
				content: 'Mission Content',
				user: user
			});

			done();
		});
	});

	// Test the 'Mission' model save method
	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			Mission.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an Mission without a title', function() {
			Mission.title = '';
			
			Mission.save(function(err) {
				should.exist(err);
			});
		});
	});

	// Define a post-tests function
	afterEach(function(done) {
		// Clean the database
		Mission.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});