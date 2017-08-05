/**
 * Created by חן קאשי on 27/06/2017.
 */

/**
 * Created by hen on 23/06/2017.
 */
angular.module('myApp').controller('logoutController', ['UserService', 'localStorageService','loginController', '$http', '$window',
    function(UserService,loginController, $http, $window) {
        var  self = this;
        var UserNameThatDoLogout=loginController.userService.userNameIsLogInNow;
        self.logout=function(){
        try {

                 $http.post("http://localhost:3000/users/logout" ,  UserNameThatDoLogout).then(function (response) {
                        if(response.data.equals(loginController.cookieValue)){
                               $window.alert('You are initiate logout ');
                              //    $location.path('/');
                               localStorageService.deleteCookie(loginController.user);
                              $window.alert("logout Succeseed" );
                          }
                         else throw error;
                 }, function (error) {
                         self.errorMessage = error.data;
                         self.cookieKey=null;
                          self.cookieValue=null;
                         $window.alert('log-in has failed-No valid UserName');
                })

        }
        catch(Error) {
            $window.alert('log-in has failed-No valid UserName');
        }

        };
    }]);

















