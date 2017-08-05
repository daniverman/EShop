/**
 * Created by daniel on 22/06/2017.
 */
var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule' ,'ngCookies' ]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App_Daniel&Hen');
});

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
        .when("/register", {
            templateUrl: "./register/Register.html",
            controller: "registerController"
        })
        .when("/restorePass", {
            templateUrl: "./restorePass/restorePassView.html",
            controller: "restoreController"
        })
        .when("/about", {
            templateUrl: "./about/aboutView.html",
            controller: "aboutController"
        })
        .when("/items", {
            templateUrl: "./items/itemsView.html",
            controller: "itemsController"
        })
        .when("/localStorageService", {
            templateUrl: "./localStorageService/localStorageView.html",
            controller: 'localStorageController'
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
            templateUrl: "./order/orderView.html",
            controller: "orderPageController"
        })
        .otherwise({
            redirect: '/',
        });
}]);

app.factory('UserService', ['$http', '$cookies', function ($http, $cookies) {
    var service = {};
    service.isLoggedIn = false;
    service.userNameIsLogInNow = '';

    service.login = function (user) {
        var parm = {"userName": user.userName, "password": user.password}
        //only in the first log in we will send to the server the pass word- but not after that
        return $http.post('http://localhost:3000/users/login/', parm).then(function (response) {
            //this is data to get the token without metadata of the sended response
            var token = response.data;
            $http.defaults.headers.common = {
                'my-Token': token,
                'user': user.userName
            };
            service.userNameIsLogInNow = user.userName;
            service.isLoggedIn = true;
            service.userNewPresntaionServer = $http.defaults.headers.common;

            //cookie handle

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 7);
            console.log("date " + expireDate);

            $cookies.put('username', service.userNameIsLogInNow, {'expires': expireDate});
            $cookies.put('token', token, {'expires': expireDate});
            $cookies.put('isLeftLoggedIn', true, {'expires': expireDate});

            return Promise.resolve(response);


        })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };

    /*
    service.getLastEntry = function () {
        var parms = {"userName" : this.userNameIsLogInNow};
        var LastEntry ="";
        $http.get("http://localhost:3000/user/LastConnected/" , parms).then(function (res) {
             LastEntry = res.data[0].lastEntry.substring(0,11);
             //update
            //
           // var parm = {"userName" : this.userNameIsLogInNow};
           // $http.post("http://localhost:3000/user/UpdateLastConnected/" , parm);

        });
        return LastEntry;
    };

*/


    service.logout = function(){
        var message = "God Bay : " +service.userNameIsLogInNow+ "Hope To see u Soon";

        $cookies.remove('username');
        $cookies.remove('token');
        $cookies.remove('isLeftLoggedIn');

        service.isLoggedIn = false;
        service.userNameIsLogInNow = "";

        alert(message);
    };


    service.getCookie = function () {
        var cookieUserName = $cookies.get('username');
        var cookieToken = $cookies.get('token');
        var cookieLog = $cookies.get('isLeftLoggedIn');
        var object = {
            userName : cookieUserName,
            token : cookieToken,
            isLeftLoggedIn : cookieLog
        };
        return object;

    };


    return service;
}]);


