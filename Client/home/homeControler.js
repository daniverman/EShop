/**
 * Created by חן קאשי on 23/06/2017.
 */



app.controller('HomePageController' , function ($scope , $http , $location) {
    $scope.MoveToPage = function (path) {
        $location.path("/"+path);
    }

});
