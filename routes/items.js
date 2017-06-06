/**
 * Created by daniel on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var db = require('../DButils');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("in items main page");
});

//return top 5 product that have the most sales (not top five from the week as required  )
//check
router.get('/HotFive', function (req, res, next) {
    console.log("hj");
    var topFive = [];
    var ans = [];
    var qurey = "SELECT TOP(5) * FROM user_tb ORDER BY salesNumber";
    db.Select(query).then(function (ans) {
        topFive = ans;
        for (var i = 0; i < 5 || topFive.length; i++) {
            topFive[i] = (JSON.stringify(topFive[i]));
        }
        res.send(ans);
    })
});

//return new items from last month
//check
router.get('/newItemsFromLastMonth', function (req, res) {
    var curDate = new Date();
    var lastMonth = curDate.getMonth() - 1;
    var qurey1 = "SELECT * FROM  products WHERE YEAR(AdeedOn) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(AdeedOn) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })


});

//return all items by some categorey
//check
router.get('/ItemByCategory', function (req, res) {
    var category = req.query.category;
    var maxProductsToReturn = req.query;
    var qurey = "SELECT TOP('" + maxProductsToReturn + "') * FROM product WHERE category ='" + category + "' AND password ='" + password + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});


//get item by ud
router.get('/ItemById', function (req, res) {
    var productId  = req.query.productId;
    var query = "SELECT * FROM product WHERE productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

router.get('/ItemByName', function (req, res) {
    var name  = req.query.name;
    var query = "SELECT * FROM product WHERE name ='" + name + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});
//sort item by parmater
router.get('/ItemsSortBy', function (req, res) {
    var sortBy  = req.query.sortBy;
    var query = "SELECT * FROM product ORDER BY '" + sortBy + "' DESC";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

router.get('/ItemsSortBy', function (req, res) {
    var sortBy  = req.query.sortBy;
    var query = "SELECT * FROM product ORDER BY '" + sortBy + "' DESC";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

router.post('/addItemToCart',function (req,res) {
   var ItemId = req.body.itemId;
   var userId = req.body.userId;

//
});



module.exports = router;