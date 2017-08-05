/**
 * Created by חן קאשי on 23/06/2017.
 */

app.controller('registerController', function($http,UserService,localStorageService, $location ) {

    var  self = this;
    self.user  = {userName: '', password: '',firstName:'', lastName:'', address:'',city:'', country:'' ,phone:'',mail:'',gender:'',creditCard:'',lastEntry:''};

   $http.get("countries.xml",
        {  transformResponse: function (cnv) {
                var x2js = new X2JS();
                var aftCnv = x2js.xml_str2json(cnv);
                return aftCnv;
            }
        })
        .then(function (response) {
            self.details = response.data.Countries.Country;
        }).catch(function (ans) {
        alert("Fail in register");
    })


    self.userToSaveInStorage1={userName: '',categoryId:''};
    self.userToSaveInStorage2={userName: '',categoryId:''};
    $scope.checkDetailsOnClick = function () {
        var cookieExp = new Date();
        self.lastEntry=cookieExp;
        $http.post("http://localhost:3000/users/register/" ,  self.user).then(function (response) {
            var data = response.data;

            <!--- Now Save the catgories Favorite In the Server-->
            $http.post("http://localhost:3000/users/SetFavoriteCategory/AddNewCategory" , self.userToSaveInStorage1).then(function (response) {
                alert("savedCat1");

                $http.post("http://localhost:3000/users/SetFavoriteCategory/AddNewCategory" , self.userToSaveInStorage2).then(function (response) {
                    alert("savedCat2");
                    $location.path("/login");
                })
            })
        }).catch(function (ans) {
            alert("Failed In Registered");
        })
    }

    });

