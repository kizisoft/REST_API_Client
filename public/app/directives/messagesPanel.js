'use strict';

app.directive('messagesPanel', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/directives/messagesPanel.html',
        replace: true
    };
});