'use strict';

app.factory('test', ['$resource', 'baseApiUrl', 'authorize', function ($resource, baseApiUrl, authorize) {
    var testUrl = baseApiUrl + 'test';

    function get() {
        return $resource(testUrl).get().$promise;
    }

    function post() {
        return $resource(testUrl, {}, {'save': {method: 'POST', headers: authorize.getHeaders()}}).save().$promise;
    }

    return {
        get: get,
        post: post
    };
}]);