'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseApiUrl', 'https://localhost:3001/api/');

app.config(['$routeProvider', 'middlewaresProvider', function ($routeProvider, middlewaresProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'templates/account/login.html',
            controller: 'LoginCtrl',
            resolve: middlewaresProvider.auth.isNotAuthorized
        })
        .when('/access_token=:accessToken', {
            template: '',
            controller: 'RedirectCtrl'
        })
        .when('/state=:state', {
            template: '',
            controller: 'RedirectCtrl'
        })
        .when('/error=:error', {
            template: '',
            controller: 'RedirectCtrl'
        })
        .when('/register', {
            templateUrl: 'templates/account/register.html',
            controller: 'RegisterCtrl',
            resolve: middlewaresProvider.auth.isNotAuthorized
        })
        .when('/register/social/:provider/:accessToken', {
            templateUrl: 'templates/account/registerSocial.html',
            controller: 'RegisterSocialCtrl',
            resolve: middlewaresProvider.auth.isNotAuthorized
        })
        .when('/administration', {
            templateUrl: 'templates/administration/home.html',
            controller: 'AdministrationCtrl',
            resolve: middlewaresProvider.auth.isAdmin
        })
        .when('/test', {
            templateUrl: 'templates/test/test.html',
            controller: 'TestCtrl'
        })
        .when('/profile', {
            templateUrl: 'templates/profile/profileHome.html',
            controller: 'ProfileHomeCtrl',
            resolve: middlewaresProvider.auth.isAuthorized
        })
        .when('/profile/logins', {
            templateUrl: 'templates/profile/manageLogins.html',
            controller: 'ManageLoginsCtrl',
            resolve: middlewaresProvider.auth.isAuthorized
        })
        .otherwise({
            redirectTo: '/'
        });
}]);