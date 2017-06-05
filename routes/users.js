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
    db.Select(qurey);
    //check
    var jsAns = {
        name: "userName",

    }
    res.writeHead(200, {
        'Content-Type': 'text/json'
    });
    res.write(JSON.stringify(f));
    res.end();


});

//need to check
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
    var lastEntry = "NULL";
    var query = "INSERT INTO user_tb VALUES ('" + userName + "', '" + firstName + "', '" + lastName + "', '" + password + "', '" + address + "', '" + city + "', '" + country + "', '" + phone + "', '" + mail + "', '" + creditCard + "', '" + gender + "', '" + creditCardNumber + "', '" + lastEntry + ")";
    db.Insert(query)


});

router.post('/login/restorePassword', function (req, res) {
    console.log("ds");
    var userName = req.body.userName;
    var city = req.body.city;
    var country = req.body.country;
    var phone = req.body.phone;
    var address = req.body.address;

    var query = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND city ='" + city + "'  AND country ='" + country + "' AND phone ='" + phone + "' AND address ='" + address + "'";
    db.Select(query)


});
//return last entry
router.get('/LastConnected', function (req, res, next) {
    var userName = req.query.userName;
    console.log(userName);
    var query = "SELECT lastEntry FROM user_tb WHERE userName ='" + userName + "'";
    console.log(query);
    db.Select(query);

    res.send(ans[0]);


});



module.exports = router;
