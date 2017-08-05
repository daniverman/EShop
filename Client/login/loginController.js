
/**
 * Created by hen on 23/06/2017.
 */


angular.module("myApp").controller('loginController', ['UserService','localStorageService','$location', '$window',
    function(UserService,localStorageService,$location, $window , $route) {
      var  self = this;
        self.user = {userName: null, password: null};
        self.userService=UserService;
        //now you can take self.userService.userNameIsLogInNow  (daniel for you) : loginController.userService.userNameIsLogInNow
        self.cookieKey= self.user;
        self.cookieValue="";


        self.login = function(valid) {
            if (valid) {

                UserService.login(self.user).then(function (successToken) {
                    $window.alert("You are logged in");
                    self.user=UserService.userNewPresntaionServer;
                    $location.path('/');

                }, function (error) {
                    self.errorMessage = error.data;
                    self.cookieKey=null;
                    self.cookieValue=null;
                    $window.alert('log-in has failed-No valid UserName');
                })
            }
        };


       self.MoveToPage = function (DirectoryToMove) {
            $location.path("/"+DirectoryToMove);
        }



    }]);
















