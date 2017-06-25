/**
 * Created by חן קאשי on 23/06/2017.
 */
angular.module("myApp").controller('registerController' , function ($scope , $http , $location) {
    var s=this;
    s.userName="";
    s.FirstName="";
    s.LastName="";
    s.Address="";
    s.City="";
    s.Country="";
    s.Telephone="";
    s.Email="";
    s.Gender="";
    s.password="";
    s.CreditCard="";
    $scope.checkDetailsOnClick = function () {

        var  self = this;
         alert("in register");
        alert($scope.userName);
        alert($scope.FirstName);
        alert($scope.LastName);
        alert($scope.Address);
        alert($scope.City);
        alert($scope.Country);
        alert($scope.Telephone);
        alert($scope.Email);
        alert($scope.Gender);
        alert($scope.password);
        alert($scope.CreditCard);

         //   "lastEntry": "2017-05-28T00:00:00.000Z",
         //  "cartId": "henkash" i do it  in server cartid=username

       var params = {"userName" : $scope.userName , "password": $scope.password, "firstName": $scope.FirstName,"lastName":$scope.LastName,"address":$scope.Address, "city":$scope.City,"country":$scope.Country,"phone":$scope.Telephone,"email":$scope.Email,"gender":$scope.Gender};

        $http.post("http://localhost:3000/users/register/" , params).then(function (response) {
            alert("in then- You Register-Move to LogIn")
            var data = response.data;
            $location.path("/login");


        });


    }

    });