angular.module("myApp").controller('itemController' , function ($scope , $http , $location ,srvShareData ) {
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
    //not complete
    $scope.addItemToCart = function() {
        //adding chosen item to cart
        var item = $scope.chocsenItem;
        var amount = $scope.AmountTheUserChose;
        //need to change to real user
        var userName = "daniverman";
        alert(amount);
        alert(item.name);
        $scope.showModal = false;
        var chosen = $scope.chocsenItem;
        //im shring item + amount
        this.shareMyData(chosen);
        this.shareMyData(amount);
        ///addItemToCart ->need user id and product id
        var params ={"productId" : chosen.productId , "cartId" : "userName"};

        $http({
            url : "http://localhost:3000/items/addItemToCart",
            method : "POST",
            params : params
        }).then(function (response) {
            if(response.data==true) {
                var message = "" + chosen.name + "Adeed Successfuly Yuor Cart ,remminder item amount that was selcted was " + amount + ";"
                alert(message);
            }
            else
                alert("Unable to add this item to cart , please try aegean");
        });
    };
    $scope.dtatToShare =[];
    $scope.shareMyData = function (myValue) {

        $scope.dataToShare = myValue;
        srvShareData.addData($scope.dataToShare);
    }


    $scope.favCat =[];
    $scope.favAns =[];

    //not complete
    $scope.getRecommendedItem = function () {
        var UserName = "daniverman";
        var first_url="http://localhost:3000/items/recommendedItemsForUser/GetUserCategories";
        var params ={"userName" : UserName};
        $http({
            url : first_url,
            method : "GET" ,
            params : params
        }).then(function (response) {
            $scope.favCat = response.data;
            var second_url ="http://localhost:3000/items/recommendedItemsForUser/AddMoreRecommendedItemsByCategory";
            for(var i=0 ; i<favCat.length ; i++){
                var params ={"userName" : UserName ,"categoryId" :favCat[i] };
                $http({
                    url : second_url,
                    method : "GET" ,
                    params : params
                }).then(function (response) {
                    $scope.favAns.push(response.data);
                });
            }
        });
    };







    $scope.userIsLoged = function () {
        //neet to return boolean if the user not login
        $scope.getRecommendedItem()
        return true;
    }


});
