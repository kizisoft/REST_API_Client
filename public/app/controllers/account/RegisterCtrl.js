'use strict';

app.controller('RegisterCtrl', ['$scope', '$location', 'auth', 'authorize', 'notifier', function ($scope, $location, auth, authorize, notifier) {
    $scope.register = function (provider, options) {
        auth.providers[provider].register(options || {})
            .then(function (user) {
                authorize.saveUser(user);
                $location.path('/');
            }, function (err) {
                $scope.error(err);
            });
    };
}]);