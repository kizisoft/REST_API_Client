'use strict';

app.controller('LoginCtrl', ['$scope', '$location', 'auth', 'authorize', 'redirect', 'notifier', function ($scope, $location, auth, authorize, redirect, notifier) {
    $scope.login = function login(options) {
        auth.providers['basic'].login(options || {})
            .then(function (user) {
                authorize.saveUser(user);
                $location.path('/');
            }, function (err) {
                notifier.notifyError(err.data);
            });
    };

    $scope.loginSocial = function loginSocial(provider) {
        if (!auth.exist(provider)) {
            notifier.notifyError('Unknown social login provider "' + provider + '"!', {isSticky: true});
        } else {
            auth.providers[provider].login({provider: provider, location: '+login'});
        }
    };

    var params = redirect.getData();
    if (params) {
        var state = JSON.parse(params.state);
        auth.providers[state.provider].loginSocial({accessToken: params.access_token})
            .then(function (user) {
                authorize.saveUser(user);
                $location.path('/');
            }, function (err) {
                if (err.data) {
                    if (err.status === 403) {
                        $location.path('/register/social/' + state.provider + '/' + params.access_token);
                    } else {
                        notifier.notifyError('Authentication Error: ' + err.data, {isSticky: true});
                        $location.path('/login');
                    }
                } else {
                    notifier.notifyError('Internet Connection Error. Server not responding! Check the internet connection and try again later.', {isSticky: true});
                    $location.path('/login');
                }
            });
    }
}]);