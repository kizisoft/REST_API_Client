'use strict';

app.controller('ProfileHomeCtrl', ['$scope', '$routeParams', '$location', 'authorize', 'profile', function ($scope, $routeParams, $location, authorize, profile) {
    profile.getProfile($routeParams.id)
        .then(function (profileDb) {
            $scope.user = profileDb;
        }, function (err) {
            $scope.error(err, 'Can not get user profile: ');
            $location.path('/');
        });
    $scope.isPrivateAuthorized = authorize.isPrivateAuthorized($routeParams.id);
}]);