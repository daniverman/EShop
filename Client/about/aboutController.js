/**
 * Created by חן קאשי on 25/06/2017.
 */


app.controller('aboutController' , function ($scope,$http , $location) {


    $scope.MoveToPage = function (DirectoryToMove) {
        <!---this will give use to enter to the directory of the page we want to be move to him : path is the new path - and location is the current path that update now !!! to the dirctory givien-->

        $location.path("/"+DirectoryToMove);
    }

});
