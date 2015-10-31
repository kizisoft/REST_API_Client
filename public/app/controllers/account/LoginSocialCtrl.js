'use strict';

app.controller('LoginSocialCtrl', ['$scope', '$location', 'auth', 'authorize', 'notifier', function ($scope, $location, auth, authorize, notifier) {
    var hash = $location.path().substr(1),
        splitted = hash.split('&'),
        params = {};
    for (var i = 0; i < splitted.length; i++) {
        var param = splitted[i].split('='),
            key = param[0];
        params[key] = param[1];
    }
    if (params.error) {
        notifier.notifyError('Authentication Error: ' + params.error, {isSticky: true});
        $location.path("/login");
        return;
    }

    var state = JSON.parse(params.state);
    if (state.action === 'default') {
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
    if (state.action === 'add') {
        auth.providers[state.provider].addSocialLogin({accessToken: params.access_token})
            .then(function (userLogin) {
                notifier.notifySuccess('New ' + userLogin.provider + ' login added!');
                $location.path('/profile/logins');
            }, function (err) {
                if (err.data) {
                    notifier.notifyError('Authentication Error: ' + err.data, {isSticky: true});
                    $location.path('/profile/logins');
                } else {
                    notifier.notifyError('Internet Connection Error. Server not responding! Check the internet connection and try again later.', {isSticky: true});
                    $location.path('/profile/logins');
                }
            });
    }
}]);