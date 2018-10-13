var app = angular.module('chatApp', ['ui.router', 'ngResource']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'views/login/login.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register/register.html'
		});

	$urlRouterProvider.otherwise('/login');
});
