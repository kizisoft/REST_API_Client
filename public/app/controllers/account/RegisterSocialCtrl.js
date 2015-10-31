'use strict';

app.controller('RegisterSocialCtrl', ['$scope', '$location', '$routeParams', 'auth', 'authorize', 'notifier', function ($scope, $location, $routeParams, auth, authorize, notifier) {
    $scope.register = function (username) {
        var options = {
            username: username,
            accessToken: $routeParams.accessToken
        };
        auth.providers[$routeParams.provider].register(options)
            .then(function (user) {
                authorize.saveUser(user);
                $location.path('/');
            }, function (err) {
                notifier.notifyError(err.data, {isSticky: true});
            });
    };
}]);