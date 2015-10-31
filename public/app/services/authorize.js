'use strict';

app.factory('authorize', ['encryption', function (encryption) {
    var storageKey = 'user';

    function saveUser(user) {
        var stringUser = angular.toJson(user);
        localStorage.setItem(storageKey, encryption.encrypt(stringUser));
    }

    function removeUser() {
        localStorage.removeItem(storageKey);
    }

    function getUser() {
        var user = localStorage.getItem(storageKey);
        if (user) {
            return angular.fromJson(encryption.decrypt(user));
        }
    }

    function isLoggedIn() {
        return !!getUser();
    }

    function isInRole(role) {
        var user = getUser();
        if (user) {
            return user.roles.indexOf(role) !== -1;
        }
        return false;
    }

    function getHeaders() {
        var user = getUser();
        if (user) {
            return {'Authorization': 'Bearer ' + user.token};
        }
        return {};
    }

    return {
        saveUser: saveUser,
        removeUser: removeUser,
        getUser: getUser,
        isLoggedIn: isLoggedIn,
        isInRole: isInRole,
        getHeaders: getHeaders
    };
}]);