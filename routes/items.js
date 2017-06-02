/**
 * Created by daniel on 02/06/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/get', function(req, res, next) {
    var item = req.query.itemId;
    res.send("ok");
});



module.exports = router;