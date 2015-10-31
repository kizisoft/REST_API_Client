'use strict';

app.factory('encryption', function () {
    var pass = 'SuperSecretPassword';

    function Encryption() {
    }

    Encryption.prototype.encrypt = function (message) {
        return CryptoJS.AES.encrypt(message, pass);
    };

    Encryption.prototype.decrypt = function (message) {
        return CryptoJS.AES.decrypt(message, pass).toString(CryptoJS.enc.Utf8);
    };

    return new Encryption();
});