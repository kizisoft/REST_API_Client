'use strict';

app.factory('profile', ['$resource', 'baseApiUrl', 'authorize', function ($resource, baseApiUrl, authorize) {

    function getLogins() {
        var resource = $resource(baseApiUrl + 'profile/logins?authorization_token=' + authorize.getUser().token);
        return resource.query().$promise;
    }

    function addLogin(provider, data) {
        var resource = $resource(baseApiUrl + 'profile/logins/:provider/', {provider: '@provider'}, {
            'save': {
                method: 'POST',
                headers: authorize.getHeaders()
            }
        });
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

    function changePassword(data) {
        var resource = $resource(baseApiUrl + 'profile/logins/', {}, {
            'update': {
                method: 'PUT',
                headers: authorize.getHeaders()
            }
        });
        return resource.update(data).$promise;
    }

    function setPassword(data) {
        var resource = $resource(baseApiUrl + 'profile/logins/', {}, {
            'save': {
                method: 'POST',
                headers: authorize.getHeaders()
            }
        });
        return resource.save(data).$promise;
    }

    function changeProfile(id, data) {
        var resource = $resource(baseApiUrl + 'profile/edit/:id/', {id: '@id'}, {
            'save': {
                method: 'POST',
                headers: authorize.getHeaders()
            }
        });
        return resource.save({id: id}, data).$promise;
    }

    function getProfile(id) {
        var resource = $resource(baseApiUrl + 'profile/:id/?authorization_token=' + authorize.getUser().token, {id: '@id'});
        return resource.get({id: id}).$promise;
    }

    return {
        getLogins: getLogins,
        addLogin: addLogin,
        deleteLogin: deleteLogin,
        changePassword: changePassword,
        setPassword: setPassword,
        changeProfile: changeProfile,
        getProfile: getProfile
    };
}]);