'use strict';

app.directive('localLogin', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/localLogin.html',
        replace: true
    };
});