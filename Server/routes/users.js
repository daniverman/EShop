var express = require('express');
var router = express.Router();
var db = require('../DButils');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('the first page of users');
});
//checked
router.post('/login', function (req, res) {
    //this is the only one time( also in register) we send the  password!!
    var userName = req.body.userName;
    var password = req.body.password;
    console.log("****************");
    console.log(userName);
    console.log(password);
    console.log("****************");

    var query = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND password ='" + password + "'";

    db.Select(query).then(function (ans) {

        if (ans.length == 0){
            res.status(403).send("username or password incorrect");
            // res.send(false);
        }
        else{
            res.send(ans);
            var token = Math.random().toString(36).substring(7);
            app.locals.users[userName] = token;
            res.json(token);
        }

    }).catch(function (ans) {
        res.status(403).send("Fail in login");
    })


});

//checked
router.post('/logout', function (req, res) {

    try{
        var userName = req.body.userName;
        var token = app.locals.users[userName];
        delete app.locals.users[userName];
        res.send(token);
    }
    catch(Error) {
        res.status(403).send("Fail in logout");
    }

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
    var cartId = userName;
    var query = "INSERT INTO user_tb VALUES ('" + userName + "', '" + firstName + "', '" + lastName + "', '" + password + "', '" + address + "', '" + city + "', '" + country + "', '" + phone + "', '" + mail + "', '" + creditCard + "', '" + gender + "', '" + lastEntry + "', '" + cartId + "')";
    var query2 = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
      console.log(query2);
    db.Select(query2).then(function (ans) {
        if (ans.length > 0) {
            res.send("userName Exist");
        }
        else {
                db.Insert(query);
                res.send("true");
        }

    }).catch(function (ans) {
        res.status(403).send("Fail in register");
    })


});
//restore the password
//checked
router.post('/login/restorePassword', function (req, res) {

         var userName = req.body.userName;
         var city = req.body.city;
         var country = req.body.country;
         var phone = req.body.phone;
         var address = req.body.address;
         var mail= req.body.mail;
         var query = "SELECT * FROM user_tb WHERE userName ='" + userName + "' AND city ='" + city + "'  AND country ='" + country + "' AND phone ='" + phone + "' AND address ='" + address + "' AND mail ='" + mail + "'";
         db.Select(query).then(function (ans) {
             if (ans.length <= 0) {
                 res.send(false);
             }
             else {
                 var pass =  ans[0].password;
                 res.send(pass);
             }

         }).catch(function (ans) {
             res.status(403).send("Fail in restore Password");
         })

});
//return last entry
//checked
router.get('/LastConnected', function (req, res) {

        console.log("***************");
        var userName = req.query.userName;

        var query = "SELECT lastEntry FROM user_tb WHERE userName ='" + userName + "'";

        db.Select(query).then(function (ans) {
            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send(ans);
            }


        }).catch(function (ans) {
            res.status(403).send("Fail in check last connected");
        })


});


//Checked
router.post('/UpdateLastConnected' , function (req,res) {
    console.log("**************");

    var userName = req.body.userName;
    var today = new Date().toLocaleString();
    var query = "UPDATE user_tb SET lastEntry = '" + today +"'" + "WHERE userName = '" + userName + "'";
    console.log("**************");
    console.log(query);
    console.log("**************");


    db.Select(query);
    res.status(200).send("ok");

});

module.exports = router;
