/**
 * Created by daniel on 22/06/2017.
 */
var app = angular.module('myApp', ['ngRoute']);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./home/HomePage.html",
            controller: "HomePageController"
        })
        .when("/login", {
            templateUrl: "./login/LoginPage.html",
            controller: "loginController"
        })
        .when("/about", {
            templateUrl: "aboutPage.html",
            controller: "aboutPageController"
        })
        .when("/items", {
            templateUrl: "./items/itemsView.html",
            controller: "itemController"
        })
        .when("/searchItems", {
            templateUrl: "searchItemsPage.html",
            controller: "searchItemsPageController"
        })
        .when("/cart", {
            templateUrl: "./cart/cartView.html",
            controller: "cartController"
        })
        .when("/order", {
            templateUrl: "orderPage.html",
            controller: "orderPageController"
        })
        .otherwise({
            redirect: '/',
        });
}]);

// app.service('srvShareData', function($window) {
//     var KEY = 'App.SelectedValue';
//
//     var addData = function(newObj) {
//         var mydata = $window.sessionStorage.getItem(KEY);
//         if (mydata) {
//             mydata = JSON.parse(mydata);
//         } else {
//             mydata = [];
//         }
//         mydata.push(newObj);
//         $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
//     };
//
//     var getData = function(){
//         var mydata = $window.sessionStorage.getItem(KEY);
//         if (mydata) {
//             mydata = JSON.parse(mydata);
//         }
//         return mydata || [];
//     };
//
//     return {
//         addData: addData,
//         getData: getData
//     };
// });




