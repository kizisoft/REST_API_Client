'use strict';

app.factory('auth', ['$location', '$resource', 'baseApiUrl', 'authorize', function ($location, $resource, baseApiUrl, authorize) {
    var resourceLogin = $resource(baseApiUrl + 'auth/login/:provider/', {provider: '@provider'}),
        resourceRegister = $resource(baseApiUrl + 'auth/register/:provider', {provider: '@provider'}, {
            'put': {
                method: 'PUT',
                headers: authorize.getHeaders()
            }
        }),
        providers = {
            google: {
                name: 'Google',
                login: function (state) {
                    window.location = 'https://accounts.google.com/o/oauth2/auth?' +
                        'scope=email profile&' +
                        'redirect_uri=http://localhost:63342/REST_API_Client/public/index.html&' +
                        'response_type=token&' +
                        'state=' + JSON.stringify(state) + '&' +
                        'client_id=765672056032-bjti8gjbvvoqv5o6t7pauur5uvcb2vnr.apps.googleusercontent.com';
                },
                loginSocial: function (data) {
                    return resourceLogin.save({provider: 'google'}, data).$promise;
                },
                register: function (data) {
                    return resourceRegister.save({provider: 'google'}, data).$promise;
                }
            },
            facebook: {
                name: 'Facebook',
                login: function (state) {
                    window.location = 'https://www.facebook.com/dialog/oauth?' +
                        'scope=email,public_profile&' +
                        'redirect_uri=http://localhost:63342/REST_API_Client/public/index.html&' +
                        'response_type=token&' +
                        'state=' + JSON.stringify(state) + '&' +
                        'client_id=1658366614411639';
                },
                loginSocial: function (data) {
                    return resourceLogin.save({provider: 'facebook'}, data).$promise;
                },
                register: function (data) {
                    return resourceRegister.save({provider: 'facebook'}, data).$promise;
                }
            },
            basic: {
                login: function (data) {
                    return resourceLogin.save({provider: 'basic'}, data).$promise;
                },
                register: function (data) {
                    return resourceRegister.save({provider: ''}, data).$promise;
                }
            }
        };

    function exist(provider) {
        return !!providers[provider];
    }

    function logout() {
        var resource = $resource(baseApiUrl + 'auth/logout', {}, {
            'put': {method: 'PUT', headers: authorize.getHeaders()}
        });
        return resource.put().$promise;
    }

    return {
        exist: exist,
        logout: logout,
        providers: providers
    }
}]);