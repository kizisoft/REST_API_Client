'use strict';

app.directive('login', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/login.html',
        replace: true
    };
});