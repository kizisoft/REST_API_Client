'use strict';

app.controller('MainCtrl', ['$scope', '$location', 'auth', 'authorize', 'notifier', function ($scope, $location, auth, authorize, notifier) {
    $scope.authorize = authorize;

    $scope.logout = function () {
        auth.logout()
            .then(function () {
                authorize.removeUser();
                notifier.notifySuccess('Logout successful');
                $location.path('/');
            }, function (err) {
                notifier.notifyError('Logout error: ' + JSON.stringify(err.data), {isSticky: true});
            });
    };

    $scope.$on('$routeChangeError', function (event, current, previous, params) {
        if (params.error) {
            notifier.notifyError(params.error, {isSticky: true});
        }
    });

    $scope.$on('$routeChangeSuccess', function (event, params) {
        if (params.locals.middlewares) {
            notifier.notifySuccess(params.locals.middlewares.success);
        }
    });
}]);