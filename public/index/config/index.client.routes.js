// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'index' module routes
angular.module('index').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'index/views/index.client.view.html',
			css: 'index/assets/css/index.css'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
