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
		.state('profile', {
			url: '/users/{userId}/profile',
			templateUrl: 'views/profile.html',
			controller: 'profile.controller',
			onEnter($timeout, $authData, $state) {
				if (!$authData.isLogged()) {
					$timeout(() => {
						$state.go('login');
					});
				}
			}
		})
		.state('rooms', {
			url: '/users/{userId}/rooms',
			templateUrl: 'views/roomList.html',
			controller: 'roomList.controller',
			onEnter($timeout, $authData, $state) {
				if (!$authData.isLogged()) {
					$timeout(() => {
						$state.go('login');
					});
				}
			}
		});

	$urlRouterProvider.otherwise('/rooms');
});
