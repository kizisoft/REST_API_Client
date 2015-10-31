'use strict';

app.controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.copyRightDate = (new Date()).getFullYear();
}]);