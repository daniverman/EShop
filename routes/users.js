var express = require('express');
var router = express.Router();
var db = require('../DButils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('the first page of /users');
});
//need to check
router.post('/login', function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var qurey = "SELECT * FROM user_tb WHERE userName ='"+userName + "' AND password ='"+ password + "'";
    db.Select(qurey)
    {
    }


});

//need to check
router.post('/register',function (req , res) {
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
    var query ="INSERT INTO user_tb VALUES ('" + userName + "', '"+ firstName + "', '"+ lastName + "', '"+ password + "', '"+ address + "', '"+ city + "', '"+ country + "', '"+ phone + "', '"+ mail + "', '"+ creditCard + "', '"+ gender + "', '"+ creditCardNumber + "', '"+ lastEntry +  ")";
    db.Insert(query)

});


module.exports = router;
