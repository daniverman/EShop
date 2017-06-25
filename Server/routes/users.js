var express = require('express');
var router = express.Router();
var db = require('../DButils');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('the first page of users');
});
//checked
router.post('/login', function (req, res) {
    console.log("in login");
    var userName = req.body.userName;
    var password = req.body.password;
    var query = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND password ='" + password + "'";

    db.Select(query).then(function (ans) {

        if (ans.length == 0){
            res.status(403).send("username or password incorrect");
            // res.send(false);
        }
        else{
            var token = req.body.password+11223344556677;
            app.locals.users[userName] = token;
            res.json(token);
        }
        // res.send(ans);
    })


});

//checked
router.post('/logout', function (req, res) {
    var userName = req.body.userName;

    //   var query2 = "DELETE FROM cart WHERE cartId = '" + userName + "'";
    //  db.Delete(query2);

    res.send(true);
});

//checked
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
    var cartId = req.body.userName;
    var query = "INSERT INTO user_tb VALUES ('" + userName + "', '" + firstName + "', '" + lastName + "', '" + password + "', '" + address + "', '" + city + "', '" + country + "', '" + phone + "', '" + mail + "', '" + creditCard + "', '" + gender + "', '" + lastEntry + "', '" + cartId + "')";
    var query2 = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    //  console.log(query2);
    db.Select(query2).then(function (ans) {
        if (ans.length > 0) {
            res.send("userName Exist");
        }
        else {
            //  console.log(query);
            if (userName != null & firstName != null & lastName != null & password != null & address != null & city != null & country != null & phone != null & mail != null & creditCard != null & gender != null & lastEntry != null & cartId != null) {
                db.Insert(query);
                res.send(true);
            }
            else {
                res.send(false);
            }
        }

    })


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
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            var pass = {
                "pass": ans[0].password
            }
            res.send(JSON.stringify(pass));
        }

    })


});
//return last entry
//checked
router.get('/LastConnected', function (req, res) {
    var userName = req.query.userName;
    // console.log(userName);
    var query = "SELECT lastEntry FROM user_tb WHERE userName ='" + userName + "'";
    // console.log(query);
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }


    })
});


module.exports = router;
