
/**
 * Created by hen on 23/06/2017.
 */
app.controller('loginController', ['UserService', '$location', '$window',
    function(UserService, $location, $window) {
        var  self = this;
        self.user = {userName: '', password: ''};

        self.login = function(valid) {
            if (valid) {

                UserService.login(self.user).then(function (success) {
                    $window.alert('You are logged in');
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
    }]);


















// angular.module("myApp").controller('loginController' ,function ($scope , $http , $location) {
//     $scope.checkDetailsOnClick = function () {
//         alert("in login");
//         alert($scope.userName);
//         alert( $scope.password);
//         //this user is changed to token and not for username and password
//    //  angular.module("myApp").user ={"userName" : $scope.userName , "password" :$scope.password };
//
//     }
// });
//








//
//
//
//
// //
// // myApp.controller('loginController' , function ( $http , $location) {
// //
// //     alert("check");
// //     var params = {"userName": $scope.userName, "password": $scope.password};
// //     $http.post("http://localhost:3000/users/login/", params).then(function (response) {
// //         alert("in then")
// //         var data = response.data;
// //         $scope.test = data;
// //
// //     });
// //
// // });
