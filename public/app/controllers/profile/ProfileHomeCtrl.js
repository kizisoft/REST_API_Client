'use strict';

app.controller('ProfileHomeCtrl', ['$scope', 'authorize', function ($scope, authorize) {
    $scope.user = authorize.getUser();
}]);