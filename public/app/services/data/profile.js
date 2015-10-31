'use strict';

app.factory('profile', ['$resource', 'baseApiUrl', 'authorize', function ($resource, baseApiUrl, authorize) {
    var resource = $resource(baseApiUrl + 'profile/logins/:provider/', {provider: '@provider'}, {
        'save': {
            method: 'POST',
            headers: authorize.getHeaders()
        }
    });

    function getLogins() {
        var resource = $resource(baseApiUrl + 'profile/logins?authorization_token=' + authorize.getUser().token);
        return resource.query().$promise;
    }

    function addLogin(provider, data) {
        return resource.save({provider: provider}, data).$promise;
    }

    function deleteLogin(id) {
        var resource = $resource(baseApiUrl + 'profile/logins/:id/', {id: '@id'}, {
            'delete': {
                method: 'DELETE',
                headers: authorize.getHeaders()
            }
        });
        return resource.delete({id: id}).$promise;
    }

    return {
        getLogins: getLogins,
        addLogin: addLogin,
        deleteLogin: deleteLogin
    };
}]);