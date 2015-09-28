// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mission = mongoose.model('Mission');

// Define global test variables
var user, Mission;

// Create an 'Missions' controller test suite
describe('Mission Controller Unit Tests:', function() {
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

			Mission.save(function(err) {
				done();
			});
		});
	});

	// Test the 'Mission' GET methods
	describe('Testing the GET methods', function() {
		it('Should be able to get the list of Missions', function(done) {
			// Create a SuperTest request
			request(app).get('/api/Missions/')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					res.body.should.be.an.Array.and.have.lengthOf(1);
					res.body[0].should.have.property('title', Mission.title);
					res.body[0].should.have.property('content', Mission.content);

					done();
				});
		});

		it('Should be able to get the specific Mission', function(done) {
			// Create a SuperTest request
			request(app).get('/api/Missions/' + Mission.id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					res.body.should.be.an.Object.and.have.property('title', Mission.title);
					res.body.should.have.property('content', Mission.content);

					done();
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