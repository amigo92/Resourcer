angular.module('currentorderService', [])

.factory('CurrentOrder', function($http) {

	// create a new object
	var currentorderFactory = {};

	// get a single currentorder
	currentorderFactory.get = function(id) {
		return $http.get('/api/currentorders/' + id);
	};

	// get all currentorders
	currentorderFactory.all = function() {
		return $http.get('/api/currentorders/');
	};

	// create a currentorder
	currentorderFactory.create = function(currentorderData) {
		return $http.post('/api/currentorders/', currentorderData);
	};

	// update a currentorder
	currentorderFactory.update = function(id, currentorderData) {
		return $http.put('/api/currentorders/' + id, currentorderData);
	};

	// delete a currentorder
	currentorderFactory.delete = function(id) {
		return $http.delete('/api/currentorders/' + id);
	};

	// return our entire currentorderFactory object
	return currentorderFactory;

});
