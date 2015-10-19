angular.module('userApp', ['chart.js','ngAnimate','mgcrea.ngStrap', 'app.routes', 'authService', 'mainCtrl', 'userCtrl','customerCtrl','currentorderCtrl', 'userService', 'leadCtrl', 'leadService','customerService','currentorderService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});
