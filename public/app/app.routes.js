angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})
		
		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		
		.when('/leads', {
			templateUrl: 'app/views/pages/leads/alllead.html',
			controller: 'leadController',
			controllerAs: 'lead'
		})
.when('/customers', {
			templateUrl: 'app/views/pages/customers/allcustomer.html',
			controller: 'customerController',
			controllerAs: 'customer'
		})
		.when('/currentorders', {
			templateUrl: 'app/views/pages/currentorders/allcurrentorder.html',
			controller: 'currentorderController',
			controllerAs: 'currentorder'
		})
		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
		.when('/leads/create', {
			templateUrl: 'app/views/pages/leads/singlelead.html',
			controller: 'leadCreateController',
			controllerAs: 'lead'
		})
		.when('/leads/analyze', {
			templateUrl: 'app/views/pages/leads/analysis.html',
			controller: 'leadController',
			controllerAs: 'lead'
		})
		.when('/customers/create', {
			templateUrl: 'app/views/pages/customers/singlecustomer.html',
			controller: 'customerCreateController',
			controllerAs: 'customer'
		})
		.when('/currentorders/create', {
			templateUrl: 'app/views/pages/currentorders/singlecurrentorder.html',
			controller: 'currentorderCreateController',
			controllerAs: 'currentorder'
		})
		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})
		.when('/leads/:lead_id', {
			templateUrl: 'app/views/pages/leads/singlelead.html',
			controller: 'leadEditController',
			controllerAs: 'lead'
			
		});
		

	$locationProvider.html5Mode(true);

});
