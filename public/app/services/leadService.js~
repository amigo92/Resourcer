angular.module('leadService', [])

.factory('Lead', function($http) {

	// create a new object
	var leadFactory = {};

	// get a single lead
	leadFactory.get = function(id) {
		return $http.get('/api/leads/' + id);
	};

	// get all leads
	leadFactory.all = function() {
		return $http.get('/api/leads/');
	};

	// create a lead
	leadFactory.create = function(leadData) {
		return $http.post('/api/leads/', leadData);
	};

	// update a lead
	leadFactory.update = function(id, leadData) {
		return $http.put('/api/leads/' + id, leadData);
	};

	// delete a lead
	leadFactory.delete = function(id) {
		return $http.delete('/api/leads/' + id);
	};

	// return our entire leadFactory object
	return leadFactory;

});
