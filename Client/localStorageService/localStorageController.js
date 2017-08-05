/**
 * Created by חן קאשי on 25/06/2017.
 */


angular.module("myApp").controller('StorageController', ['loginController','$window', function (localStorageService,loginController, $window) {
        var self = this;
    $window.alert('here');
        self.addData = function () {
           var lsLength = localStorageService.length();
            var valueStored = localStorageService.get(loginController.key);
            if (!valueStored) {
                if (localStorageService.set(loginController.key, loginController.value))
                    $window.alert('data was added successfully');
                else
                    $window.alert('failed to add the data');
            }
            else
                $window.alert('failed to add the data');

            localStorageService.get(key);
        };
        self.deleteData = function () {
           var valueStored = localStorageService.get(loginController.key);
            if (valueStored) {
                localStorageService.remove(loginController.key);
                $window.alert('data was deleted successfully');
            }
            else
                $window.alert('failed to delete the data');
        };

        self.addCookie = function () {
            $window.alert("in cookie");
           var cookieVal = localStorageService.cookie.get(loginController.cookieKey);
            if (!cookieVal)
                if (localStorageService.cookie.set(loginController.cookieKey,loginController.cookieValue, 3))
                    $window.alert('cookie was added successfully');
                else
                    $window.alert('failed to add the cookie');
            else
                $window.alert('failed to add the cookie');
        };

        self.deleteCookie = function () {

          var cookieVal = localStorageService.cookie.get(loginController.cookieKey);
            if (cookieVal) {
                localStorageService.cookie.remove(loginController.cookieKey);
                $window.alert('data was deleted successfully');
            }
            else
                $window.alert('failed to delete the cookie');
        };
    }]);