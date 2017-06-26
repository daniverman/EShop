angular.module("myApp").controller('itemController', function ($scope, $http, $location, $log, getRecServes) {
    var ctrl = this;
    $scope.getItem = function () {
        var parms = {"productId": $scope.productId}
        $http({
            url: "http://localhost:3000/items/ItemById",
            method: "GET",
            params: parms
        }).then(function (response) {
            $scope.test = response.data;
        });
    }

    $scope.getItemByCategory = function (categoryId) {
        var params = {"categoryId": categoryId, "maxProductsToReturn": "10"};
        $http({
            url: "http://localhost:3000/items/ItemByCategory",
            method: "GET",
            params: params
        }).then(function (response) {
            $scope.returnItems = response.data;
            $log.info("response", ctrl.returnItems);
        });

    }
    $scope.openDialog = function (item) {
        $scope.chocsenItem = item;
        $scope.showModal = true;
    }
    $scope.cancel = function () {
        $scope.showModal = false;
    };
    //not complete
    $scope.addItemToCart = function () {
        //adding chosen item to cart
        var item = $scope.chocsenItem;
        var amount = $scope.AmountTheUserChose;
        //need to change to real user
        var userName = "daniverman";
        $scope.showModal = false;
        var chosen = $scope.chocsenItem;
        alert(chosen.name);
        alert(chosen.size);
        alert(chosen.color);

        ///addItemToCart ->need user id and product id
        var params = {"productId": chosen.productId, "cartId": userName , "AmountOfTheSameItem" : amount ,"ItemName" : chosen.name , "ItemSize" : chosen.size , "ItemColor" : chosen.color} ;
        $http.post("http://localhost:3000/items/addItemToCart/" ,params).then(function (response) {
            alert(response.data);
            if (response.data == true) {
                var message = "" + chosen.name + "Adeed Successfuly Yuor Cart ,remminder item amount that was selcted was " + amount + ";"
                alert(message);
            }
            else
                alert("Unable to add this item to cart , please try aegean");
        });
    };

    //recommended not working
    $scope.favCat = [];
    $scope.RecItems = [];

    $scope.rec = function () {
        if(true){
            var UserName = "daniverman";
            var first_url = "http://localhost:3000/items/recommendedItemsForUser/GetUserCategories";
            var params = {"userName": UserName};
            $http({
                url: first_url,
                method: "GET",
                params: params
            }).then(function (response) {
                for(var z =0 ; z<response.data.length ; z++){
                    $scope.favCat.push(response.data[z].categoryId)  ;
                }
                if (true) {
                    var first_url = "http://localhost:3000/items/GetAllItems";
                    $http({
                        url: first_url,
                        method: "GET",
                        params: params
                    }).then(function (response) {
                        for(var i=0 ; i<response.data.length ; i++){
                            if($scope.favCat.indexOf(response.data[i].categoryId) !== -1){
                                $scope.RecItems.push(response.data[i]);
                            }

                        }
                    });
                }
            });
        }
    }



});






angular.module('myApp').factory('getRecServes', function () {
    var data = "";
    return {
        getServes: function (parmas) {
            alert("in serves");
            $http({
                url: "http://localhost:3000/items/recommendedItemsForUser/GetUserCategories",
                method: "GET",
                params: parmas
            }).then(function (response) {
                alert("sfd");
                data = response.data;
            })
        },
        getData: function () {
            alert("get data");
            return data;
        }
    }
});

