// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Missions' module E2E test suite
describe('Missions E2E Tests:', function() {
	// Test the new Mission page
	describe('New Mission Page', function() {
		it('Should not be able to create a new Mission', function() {
			// Load the new Mission page
			browser.get('http://localhost:3000/#!/Missions/create');

			// Get the submit button
			element(by.css('input[type=submit]')).click();

			// Get the error message element
			element(by.binding('error')).getText().then(function(errorText) {
				// Check the error message text
				expect(errorText).toBe('User is not logged in');
			});
		});
	});
});