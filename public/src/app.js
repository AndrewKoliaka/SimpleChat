const app = angular.module('chatApp', ['ui.router', 'ngResource', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    this._redirectIfNotAuthorized = ($timeout, $authData, $state) => {
        if (!$authData.isLogged()) {
            $timeout(() => {
                $state.go('login');
            });
        }
    };

    this._redirectIfAuthorized = ($timeout, $authData, $state) => {
        if ($authData.isLogged()) {
            $timeout(() => {
                const userId = $authData.getUserId();

                $state.go('rooms', { userId });
            });
        }
    };

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            onEnter: this._redirectIfAuthorized
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            onEnter: this._redirectIfAuthorized
        })
        .state('users', {
            url: '/users',
            templateUrl: 'views/userList.html',
            controller: 'userList.controller',
            controllerAs: 'userListCtrl',
            onEnter: this._redirectIfNotAuthorized
        })
        .state('profile', {
            url: '/users/{userId}/profile',
            templateUrl: 'views/profile.html',
            controller: 'profile.controller',
            controllerAs: 'profileCtrl',
            onEnter: this._redirectIfNotAuthorized
        })
        .state('rooms', {
            url: '/rooms',
            templateUrl: 'views/roomList.html',
            controller: 'roomList.controller',
            controllerAs: 'roomListCtrl',
            onEnter: this._redirectIfNotAuthorized
        })
        .state('room', {
            url: '/rooms/{roomId}',
            templateUrl: 'views/room.html',
            controller: 'room.controller',
            controllerAs: 'roomCtrl',
            onEnter: this._redirectIfNotAuthorized
        });

    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('$httpResponseErrorInterceptor');
    $httpProvider.interceptors.push('$httpLoadingInterceptor');
});
