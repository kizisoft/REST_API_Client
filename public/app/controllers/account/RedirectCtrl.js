'use strict';

app.controller('RedirectCtrl', ['$scope', '$rootScope', '$location', 'redirect', function ($scope, $rootScope, $location, redirect) {
    var hash = $location.path().substr(1),
        splitted = hash.split('&'),
        params = {};
    for (var i = 0; i < splitted.length; i++) {
        var param = splitted[i].split('='),
            key = param[0];
        params[key] = param[1];
    }

    var state = JSON.parse(params.state);
    redirect.to(state.location.split('+').join('/'), params);
}]);