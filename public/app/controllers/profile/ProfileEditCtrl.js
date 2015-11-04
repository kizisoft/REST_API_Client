'use strict';

app.controller('ProfileEditCtrl', ['$scope', '$location', 'authorize', 'profile', 'notifier', function ($scope, $location, authorize, profile, notifier) {
    var user = authorize.getUser();
    $scope.username = user.username;
    $scope.profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image.url
    };

    $scope.saveChanges = function (profileInfo) {
        profile.changeProfile(user.id, profileInfo)
            .then(function (userDb) {
                authorize.saveUser(userDb);
                notifier.notifySuccess('User profile changed!');
                $location.path('/profile/');
            }, function (err) {
                $scope.error(err, 'Can not change user profile: ');
            })
    }
}]);