'use strict';

app.provider('middlewares', function () {
    this.auth = {
        isAuthorized: {
            middlewares: function (authorize) {
                return new Promise(function (resolve, reject) {
                    if (!authorize.isLoggedIn()) {
                        reject({error: 'Access denied. Login first!'});
                    } else {
                        resolve({success: '!!! isAuthorized !!!'});
                    }
                });
            }
        },
        isNotAuthorized: {
            middlewares: function (authorize) {
                return new Promise(function (resolve, reject) {
                    if (authorize.isLoggedIn()) {
                        reject({error: 'User is already logged in!'});
                    } else {
                        resolve({success: '!!! isNotAuthorized !!!'});
                    }
                });
            }
        },
        isAdmin: {
            middlewares: function (authorize) {
                return new Promise(function (resolve, reject) {
                    if (!authorize.isInRole('Admin')) {
                        reject({error: 'Administrator access is required!'});
                    } else {
                        resolve({success: '!!! isAdmin !!!'});
                    }
                });
            }
        },
        isPrivateAuthorized: {
            middlewares: function (authorize, $route) {
                return new Promise(function (resolve, reject) {
                    if (!authorize.isPrivateAuthorized($route.current.params.id)) {
                        reject({error: 'Private authorized access only!'});
                    } else {
                        resolve({success: '!!! isPrivateAuthorized !!!'});
                    }
                });
            }
        }
    };

    this.$get = function () {

    }
});