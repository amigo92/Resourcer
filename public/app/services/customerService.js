angular.module('customerService', [])

.factory('Customer', function($http) {

	// create a new object
	var customerFactory = {};

	// get a single customer
	customerFactory.get = function(id) {
		return $http.get('/api/customers/' + id);
	};

	// get all customers
	customerFactory.all = function() {
		return $http.get('/api/customers/');
	};

	// create a customer
	customerFactory.create = function(customerData) {
		console.log(customerData);
		return $http.post('/api/customers/', customerData);
	};

	// update a customer
	customerFactory.update = function(id, customerData) {
		return $http.put('/api/customers/' + id, customerData);
	};

	// delete a customer
	customerFactory.delete = function(id) {
		return $http.delete('/api/customers/' + id);
	};

	// return our entire customerFactory object
	return customerFactory;

});
