'use strict';

app.directive('externalLogin', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/externalLogin.html',
        replace: true
    }
});