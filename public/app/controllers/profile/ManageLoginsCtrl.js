'use strict';

app.controller('ManageLoginsCtrl', ['$scope', 'authorize', 'auth', 'profile', 'redirect', 'notifier', function ($scope, authorize, auth, profile, redirect, notifier) {
    $scope.isLocalUser = authorize.getUser().isLocalUser;

    $scope.addLogin = function (provider) {
        auth.providers[provider].login({provider: provider, location: '+profile+logins'});
    };

    $scope.removeLogin = function (id) {
        profile.deleteLogin(id)
            .then(function () {
                notifier.notifySuccess('External login deleted!');
                redirect.reload();
            }, function (err) {
                error(err, 'Can not delete external login: ');
            });
    };

    var params = redirect.getData();
    if (params) {
        var state = JSON.parse(params.state);
        profile.addLogin(state.provider, {accessToken: params.access_token})
            .then(function (userLogin) {
                notifier.notifySuccess('New ' + userLogin.provider + ' login added!');
                redirect.reload();
            }, function (err) {
                error(err, 'Can not add external login: ');
            });
    }

    profile.getLogins()
        .then(function (logins) {
            $scope.logins = {};
            for (var provider in auth.providers) {
                if (auth.providers.hasOwnProperty(provider) && auth.providers[provider].name) {
                    var login = getLogin(logins, provider);
                    if (login) {
                        $scope.logins.toRemove = $scope.logins.toRemove || {};
                        $scope.logins.toRemove[provider] = login.id;
                    } else {
                        $scope.logins.toAdd = $scope.logins.toAdd || {};
                        $scope.logins.toAdd[provider] = auth.providers[provider].name
                    }
                }
            }
        }, function (err) {
            error(err, 'Can not get external logins: ');
        });

    function getLogin(logins, provider) {
        for (var i = 0, length = logins.length; i < length; i += 1) {
            if (logins[i].provider === provider) {
                return logins[i];
            }
        }
    }

    function error(err, message) {
        if (err.data) {
            notifier.notifyError(message + err.data, {isSticky: true});
        } else {
            notifier.notifyError('Internet Connection Error. Server not responding! Check the internet connection and try again later.', {isSticky: true});
        }
    }
}]);