'use strict';

app.controller('TestCtrl', ['$scope', 'test', 'notifier', function ($scope, test, notifier) {
    $scope.get = function () {
        test.get()
            .then(function (result) {
                notifier.notifySuccess('Get Test passed successfully: ' + angular.toJson(result, true), {isSticky: true});
            }, function (err) {
                notifier.notifyError('Get Test failed to pass: ' + angular.toJson(err.data, true), {isSticky: true});
            });
    };

    $scope.post = function () {
        test.post()
            .then(function (result) {
                notifier.notifySuccess('Post Test passed successfully: ' + angular.toJson(result, true), {isSticky: true});
            }, function (err) {
                notifier.notifyError('Post Test failed to pass: ' + angular.toJson(err.data, true), {isSticky: true});
            });
    };
}]);