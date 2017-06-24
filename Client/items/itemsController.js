angular.module("myApp").controller('itemController' , function ($scope , $http , $location , serviceShareData) {
    var ctrl=this;
   $scope.getItem = function () {
      var parms = {"productId" : $scope.productId}
      $http({
          url : "http://localhost:3000/items/ItemById",
          method : "GET" ,
          params : parms
      }).then(function (response) {
          $scope.test = response.data;
      });
   }

    $scope.getItemByCategory = function (categoryId) {
       var params ={"categoryId" : categoryId , "maxProductsToReturn" : "10"};
        $http({
            url : "http://localhost:3000/items/ItemByCategory",
            method : "GET" ,
            params : params
        }).then(function (response) {
            ctrl.returnItems = response.data;
        });

    }
    $scope.openDialog = function (item){
       $scope.chocsenItem=item;
        alert(item.name);
        $scope.showModal = true;
    }
    $scope.cancel = function() {
        $scope.showModal = false;
    };
    $scope.addItemToCart = function() {
        $scope.dataToShare=[];

        //adding chosen item to cart
        var item = $scope.chocsenItem;
        var amount = $scope.AmountTheUserChose;
        alert(amount);
        alert(item.name);
        $scope.showModal = false;
        var chosen = $scope.chocsenItem;
        $scope.shareMyData = function (myValue) {
            $scope.dataToShare = myValue;
            serviceShareData.addData($scope.dataToShare);
            window.location.href = "page2.html";
        }
    };

});
