'use strict';

app.controller('ManageLoginsCtrl', ['$scope', 'authorize', 'auth', 'profile', 'redirect', 'notifier', function ($scope, authorize, auth, profile, redirect, notifier) {
    $scope.isLocalUser = authorize.getUser().isLocalUser;

    $scope.setPassword = function setPassword(credentials) {
        if (!checkPasswords(credentials.password, credentials.confirmPassword)) {
            return;
        }
        profile.setPassword({newPassword: credentials.password})
            .then(function (user) {
                authorize.saveUser(user);
                redirect.reload();
                notifier.notifySuccess('New local login created!');
            }, function (err) {
                $scope.error(err, 'Can not create local login: ');
            })
    };

    $scope.changePassword = function changePassword(credentials) {
        if (!checkPasswords(credentials.newPassword, credentials.confirmPassword)) {
            return;
        }
        profile.changePassword({password: credentials.password, newPassword: credentials.newPassword})
            .then(function (user) {
                authorize.saveUser(user);
                redirect.reload();
                notifier.notifySuccess('Local password changed!');
            }, function (err) {
                $scope.error(err, 'Can not change local password: ');
            })
    };

    $scope.addLogin = function (provider) {
        auth.providers[provider].login({provider: provider, location: '+profile+logins'});
    };

    $scope.removeLogin = function (id) {
        profile.deleteLogin(id)
            .then(function () {
                notifier.notifySuccess('External login deleted!');
                redirect.reload();
            }, function (err) {
                $scope.error(err, 'Can not delete external login: ');
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
                $scope.error(err, 'Can not add external login: ');
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
            $scope.error(err, 'Can not get external logins: ');
        });

    function checkPasswords(password, confirmPassword) {
        var result = true;
        if (!password) {
            result = false;
            notifier.notifyError('Password is required!');
        }
        if (!confirmPassword) {
            result = false;
            notifier.notifyError('Confirm Password is required!');
        }
        if (password !== confirmPassword) {
            result = false;
            notifier.notifyError('Password and Confirm Password do not match!');
        }
        return result;
    }

    function getLogin(logins, provider) {
        for (var i = 0, length = logins.length; i < length; i += 1) {
            if (logins[i].provider === provider) {
                return logins[i];
            }
        }
    }
}]);