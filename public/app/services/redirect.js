'use strict';

app.factory('redirect', ['$location', '$timeout', '$route', function ($location, $timeout, $route) {

    function Redirect() {
        this._data = undefined;
    }

    Redirect.prototype.to = function to(path, data) {
        this._data = data;
        $location.path(path);
    };

    Redirect.prototype.getData = function getData() {
        var result = this._data;
        this._data = undefined;
        return result;
    };

    Redirect.prototype.reload = function reload() {
        $timeout(function () {
            $route.reload();
        }, 0);
    };

    return new Redirect();
}]);