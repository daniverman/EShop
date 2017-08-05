/**
 * Created by חן קאשי on 24/06/2017.
 */

app.controller('restoreController' , function ($scope , $http ,LocalStorageModule, $location) {

    var  self = this;
    self.user  = {userName: '', address:'',city:'', country:'' ,phone:'',mail:''};


    $scope.checkDetailsOnClick = function () {
        alert("in restore");

        $http.get("http://localhost:3000/login/restorePassword" ,  self.user).then(function (response) {
            alert("in then- You Restore-");
            var data = response.data;
            alert(data);

        }).catch(function (ans) {
            alert("Failed In Registered");
        })
    }

});

