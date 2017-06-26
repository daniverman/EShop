angular.module('myApp').controller('HomePageController' , function ($scope , $http , $location , $log) {

    $scope.MoveToPage = function (path) {
        $location.path("/"+path);
    }


    // $scope.hotFive = function () {
    //     alert("in hot")
    //     $http({
    //         url: "http://localhost:3000/items/HotFive",
    //         method: "GET",
    //     }).then(function (response) {
    //         $scope.returnItems = response.data;
    //     });
    // };


    $scope.NewItems = function () {
        if(true){
            $http({
                url: "http://localhost:3000/items/newItemsFromLastMonth/",
                method: "GET",
            }).then(function (response) {
                $scope.returnNewItems = response.data;
            });
        }

    };




});
