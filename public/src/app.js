var app = angular.module('chatApp', ['ui.router', 'ngResource', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html'
		})
		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html',
			controller: 'home.controller',
			onEnter($timeout, $authData, $state) {
				if (!$authData.isLogged()) {
					$timeout(() => {
						$state.go('login');
					});
				}
			}
		});

	$urlRouterProvider.otherwise('/home');
});
