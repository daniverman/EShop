angular.module("myApp").controller('HomePageController' , function ( $http ,UserService,$scope,$location) {
        var vm = this;
        vm.userService = UserService;


   vm.MoveToPage = function (DirectoryToMove) {
        <!---this will give use to enter to the directory of the page we want to be move to him : path is the new path - and location is the current path that update now !!! to the dirctory givien-->
        $location.path("/"+DirectoryToMove);
    }

    function checkForCookie() {
        var cookie = vm.userService.getCookie();
        if(cookie !=null && cookie.userName!= undefined){
            vm.userService.isLoggedIn = true;
            vm.userService.userNameIsLogInNow = cookie.userName;

            //GetLastEntry & update it
           // $scope.LastEntry  = vm.userService.getLastEntry();

        }
        else {
            vm.userService.isLoggedIn = false;
            vm.userService.userNameIsLogInNow = "";
        }
    }

    $scope.LogOut = function () {
        vm.userService.logout();
        $location.path("/");
    };

    $scope.Logged = false;

    checkForCookie();

    $scope.hotFive = function () {
        $http({
            url: "http://localhost:3000/items/HotFive",
            method: "GET",
        }).then(function (response) {
            $scope.returnItems = response.data;
            if(vm.userService.isLoggedIn){
                $http({
                    url: "http://localhost:3000/items/newItemsFromLastMonth/",
                    method: "GET",
                }).then(function (response) {
                    $scope.returnNewItems = response.data;
                });
            }
        });
    };




    if (vm.userService.isLoggedIn)
    {
        $scope.Logged = true;
       // $scope.userWelcome = "Welcome "+ vm.userService.userNameIsLogInNow +  " Yours Last Entry Was On : " + $scope.LastEntry;
        $scope.userWelcome = "Welcome "+ vm.userService.userNameIsLogInNow;
    }

    else
    {
        $scope.Logged = false;
        $scope.userWelcome = "Hello Guest";
    }


});
