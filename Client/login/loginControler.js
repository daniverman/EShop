/**
 * Created by חן קאשי on 23/06/2017.
 */

app.controller('loginController' , function ($scope , $http , $location) {
    $scope.checkDetailsOnClick = function () {
        alert("check");
        var params = {"userName" : $scope.userName , "password": $scope.password};
        $http.post("http://localhost:3000/users/login/" , params).then(function (response) {
            alert("in then")
            var data = response.data;
            $scope.test = data;

        });


    }
});