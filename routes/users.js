var express = require('express');
var router = express.Router();
var db = require('../DButils');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('the first page of /users');
});
//need to check
router.post('/login', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var qurey = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND password ='" + password + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })



});
//add carItd
//checked + need to add cookies that remmber the user ->is it from the server or from client
router.post('/register', function (req, res) {
    var userName = req.body.userName;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var country = req.body.country;
    var phone = req.body.phone;
    var mail = req.body.mail;
    var creditCard = req.body.creditCard;
    var gender = req.body.gender;
    var lastEntry = req.body.lastEntry;
    var cartId = req.body.cartId;
    var categorieId = req.body.categorieId;
    var query = "INSERT INTO user_tb VALUES ('" + userName + "', '" + firstName + "', '" + lastName + "', '" + password + "', '" + address + "', '" + city + "', '" + country + "', '" + phone + "', '" + mail + "', '" + creditCard + "', '" + gender + "', '" + lastEntry + "', '" + cartId + "', '" + categorieId + "')";
    console.log(query);
    db.Insert(query)


});
//restore the password
//checked
router.post('/login/restorePassword', function (req, res) {
    console.log("ds");
    var userName = req.body.userName;
    var city = req.body.city;
    var country = req.body.country;
    var phone = req.body.phone;
    var address = req.body.address;

    var query = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND city ='" + city + "'  AND country ='" + country + "' AND phone ='" + phone + "' AND address ='" + address + "'";
    db.Select(query).then(function (ans) {
        var pass ={
            "pass" : ans[0].password
        }
        res.send(JSON.stringify(pass));
    })


});
//return last entry
//checked
router.get('/LastConnected', function (req, res) {
    var userName = req.query.userName;
    console.log(userName);
    var query = "SELECT lastEntry FROM user_tb WHERE userName ='" + userName + "'";
    console.log(query);
    db.Select(query).then(function (ans) {
        res.send(ans);

    })
});





module.exports = router;
