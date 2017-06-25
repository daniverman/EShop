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
            controller: "./cart/cartController"
        })
        .when("/order", {
            templateUrl: "orderPage.html",
            controller: "orderPageController"
        })
        .otherwise({
            redirect: '/',
        });
}]);

app.service('srvShareData', function($window) {
    var KEY = 'App.SelectedValue';

    var addData = function(newObj) {
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }
        mydata.push(newObj);
        $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
    };

    var getData = function(){
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        }
        return mydata || [];
    };

    return {
        addData: addData,
        getData: getData
    };
});


app.factory('UserService', ['$http', function($http) {
    var service = {};
    service.isLoggedIn = false;
    service.login = function(user) {
        return $http.post('http://localhost:3000/users/login/', user).then(function(response) {
            alert('You are logged in');
            var token = response.data;
            $http.defaults.headers.common = {
                'my-Token': token,
                'user' : user.userName
            };
            service.isLoggedIn = true;
            return Promise.resolve(response);
        })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    return service;
}]);

app.factory('ItemModel', ['$http', function($http) {
    function ItemModel(item) {
        if (item)
            this.setData(item);
    }
    ItemModel.prototype = {
        setData: function(itemData) {
            angular.extend(this, itemData);
        },
        load: function(itemID) {
            $http.get('/items/' + itemID).then(function(itemData) {
                this.setData(itemData);
            });
        },
        add: function () {
            $http.post('/items', this).then(function(res) {
            });
        },
        delete: function() {
            $http.delete('items/delete/' + this.id); //not implemented
        }
    };
    return ItemModel;
}]);









