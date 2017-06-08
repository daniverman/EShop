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
//checked
router.get('/HotFive', function (req, res, next) {

    var query = "SELECT TOP 5 * FROM products ORDER BY salesNumber DESC";
    db.Select(query).then(function (ans) {
        res.send(JSON.stringify(ans));
    })
});

//return new items from last month
//checked
router.get('/newItemsFromLastMonth', function (req, res) {
    var curDate = new Date();
    var month = curDate.getMonth() + 1;
    var year = curDate.getFullYear();
    var query = "SELECT * FROM products WHERE MONTH(AdeedOn) = " + month + " AND YEAR(AdeedOn) = " + year;
    db.Select(query).then(function (ans) {
        res.send(JSON.stringify(ans));
    })


});

//return all items by some categorey
//checked
router.get('/ItemByCategory', function (req, res) {
    var category = req.query.category;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products WHERE category = " + category + " ";
    console.log(query);
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});


//get item by id
//checked
router.get('/ItemById', function (req, res) {
    var productId = req.query.productId;
    var query = "SELECT * FROM products WHERE productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});
//return item by name
//checked
router.get('/ItemByName', function (req, res) {
    var name = req.query.name;
    var query = "SELECT * FROM products WHERE name ='" + name + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

//return items sort by parmeter
//checked
router.get('/ItemsSortBy', function (req, res) {
    var sortBy = req.query.sortBy;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products ORDER BY '" + sortBy + "'" + " DESC";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

//return items to user recommended for him
//not complete
router.get('/recommendedItems', function (req, res) {

    var query = "";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

//add item to cart + ned to add what happen if theirs not product in inventory
//check ->the problem is that i duplicate  key
router.post('/addItemToCart', function (req, res) {
    var ItemId = req.body.ItemId;
    var userName = req.body.userName;
    var currency  = req.body.currency;
    var numberOfItems  = req.body.numberOfItems;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        console.log(cartId);
        var query2 = "SELECT * FROM products WHERE productId = '" + ItemId + "'";
        db.Select(query2).then(function (ans) {
            var price = ans[0].price;
            var totalSum = price*numberOfItems;
            var query3 = "INSERT INTO cart VALUES('" + cartId + "','" + userName + "','" + numberOfItems + "','" + totalSum + "','" + currency + "','" + ItemId + "')";
            console.log(query3);
            db.Insert(query3);
            var ans = {ans : true};

            res.send(JSON.stringify(ans));


        })
    })

});


module.exports = router;