/**
 * Created by daniel on 22/06/2017.
 */
var app = angular.module('myApp' , ['ngRoute']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "HomePage.html",
            controller : "HomePageController"
        })
        .when("/login", {
            templateUrl : "LoginPage.html",
            controller : "loginController"
        })
        .when("/cities", {
        })

        .otherwise({redirect: '/',
        });
}]);

    app.controller('HomePageController' , function ($scope , $http , $location) {
        $scope.MoveToPage = function (path) {
            $location.path("/"+path);
        }

    });





    app.controller('loginController' , function ($scope , $http , $location) {
        $scope.checkDetailsOnClick = function () {
            alert("check");
             var params = {"userName" : $scope.userName , "password": $scope.password};
             $http.post("http://localhost:3000/users/login/" , params).then(function (response) {
                 alert("in then")
                 var data = response.data;
                 $scope.test = data;

             });


        }
    });