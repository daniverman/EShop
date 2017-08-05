


angular.module('myApp').controller('itemsController' , function ( $scope, $http, $location, $log ,UserService) {
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
    
    $scope.sortBy = function (sortValue) {
        $scope.filter = sortValue;

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

    $scope.addItemToCart = function () {
        //adding chosen item to cart
        var item = $scope.chocsenItem;
        var amount = $scope.AmountTheUserChose;
        //need to change to real user
        var userName = UserService.userNameIsLogInNow;
        $scope.showModal = false;
        var chosen = $scope.chocsenItem;


        ///addItemToCart ->need user id and product id
        var params = {"productId": chosen.productId, "cartId": userName , "AmountOfTheSameItem" : amount} ;
        $http.post("http://localhost:3000/items/addItemToCart/" ,params).then(function (response) {

            if (response.data == true) {
                var message = "" + chosen.name + "Adeed Successfuly Yuor Cart ,remminder item amount that was selcted was " + amount + ";"
                alert(message);
            }
            else
                alert("Unable to add this item to cart , please try aegean");
        });
    };



    $scope.favCat = [];
    $scope.RecItems = [];
    $scope.rec = function () {
        if(UserService.isLoggedIn){






            var UserName = UserService.userNameIsLogInNow;
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
                    }).then(function () {
                        var first_url = "http://localhost:3000/items/GetAllItems";
                        $http({
                            url: first_url,
                            method: "GET",
                        }).then(function (response) {
                            $scope.returnItems = response.data;
                        });
                    });
                };
            });
        }
    };

});