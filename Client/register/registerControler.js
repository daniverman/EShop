/**
 * Created by חן קאשי on 23/06/2017.
 */
angular.module("myApp").controller('registerController' , function ($scope , $http , $location) {
    $scope.checkDetailsOnClick = function () {
         alert("in register");
         alert($scope.userName );
         alert( $scope.password);




        // //var params = {"userName" : $scope.userName , "password": $scope.password};
        // var params ={"userName" : "daniverman" , "password" : "123456"};
        $http.post("http://localhost:3000/users/register/" , params).then(function (response) {
            alert("in then")
            var data = response.data;
            //$scope.test = data;


        });


    }

    });