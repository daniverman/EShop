angular.module("myApp").controller('itemController' , function ($scope , $http , $location) {
   $scope.getItem = function () {
      var parms = {"productId" : $scope.productId}
     // alert(parms.productId);
      var string = ""+parms.toString() +"";
      alert(string);
      $http({
          url : "http://localhost:3000/items/ItemById",
          method : "GET" ,
          params : parms
      }).then(function (response) {
          alert("success");
          $scope.test = response.data;

      });
   }
});