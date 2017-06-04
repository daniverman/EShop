var express = require('express');
var router = express.Router();
var db = require('../DButils')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('the forst page of /users');
});
router.post('/login', function(req, res) {
    var userName = req.query.userName;
    var password = req.query.password;
    db.Select

});
module.exports = router;
