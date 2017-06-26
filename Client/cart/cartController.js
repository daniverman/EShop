angular.module("myApp").controller('cartController', function ($scope, $http, $location, $log) {
//if user is connect
if(true) {

    var userName = "daniverman"
    var params = {"cartId": userName};
    $http({
        url: "http://localhost:3000/items/ViewCurrentItemsInCartWithGelobalPrice",
        method: "GET",
        params: params
    }).then(function (response) {
       var TotalSum = 0;
        for(var i =0 ; i<response.data.length-1 ;i++){
           TotalSum+= parseFloat( response.data[i].totalSum);
           $scope.totalPrice = TotalSum;
        }


        $scope.returnItems = response.data;
    });

}

    $scope.openDialog = function (item) {
        var productId = item.productId;
        var params = {"productId": productId};
        $http({
            url: "http://localhost:3000/items/ItemById",
            method: "GET",
            params: params
        }).then(function (response) {
            $scope.chocsenItem = response.data[0];
            $scope.showModal = true;
        });
    }
    $scope.cancel = function () {
        $scope.showModal = false;
    };

    $scope.RemoveCart = function (item) {
        var productId = item.productId;
        var cartId = item.cartId;
        var AmountToRemoveOfTheSameItem = item.AmountOfTheSameItem;
        var params = {"productId": productId , "cartId" : cartId, "AmountToRemoveOfTheSameItem" : AmountToRemoveOfTheSameItem};
        $http.post('http://localhost:3000/items/RemoveItemFromCart',params).then(function () {
            alert("Item Was Deleted Successfully");
            $location.reload();
        })

    }
});
